import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from auth header
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get user's credits
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("credits")
      .eq("user_id", user.id)
      .single();

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: "Profile not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (profile.credits < 1) {
      return new Response(JSON.stringify({ error: "Insufficient credits" }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { videoTitle, contentCategory, targetPlatform, imageBase64 } = await req.json();

    if (!videoTitle || !contentCategory || !targetPlatform) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build the prompt for thumbnail generation
    const dimensions = targetPlatform === "youtube" 
      ? "1280x720 (16:9 aspect ratio)" 
      : "1080x1080 (1:1 square aspect ratio)";

    const prompt = `Create a highly engaging, click-worthy ${targetPlatform} thumbnail for a video titled "${videoTitle}" in the ${contentCategory} category.

Requirements:
- Dimensions: ${dimensions}
- Make it visually striking with bold colors and high contrast
- Include eye-catching elements that drive curiosity
- Optimize for high click-through rate
- Use professional design principles
- The style should match ${contentCategory} content on ${targetPlatform}
${imageBase64 ? "- Incorporate the uploaded image as the main subject/focal point" : ""}

Create a thumbnail that would make viewers immediately want to click.`;

    const messages: any[] = [
      {
        role: "user",
        content: imageBase64 
          ? [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: imageBase64 } }
            ]
          : prompt
      }
    ];

    // Generate thumbnails using Lovable AI Gateway
    const thumbnails: { imageUrl: string; explanation: string }[] = [];
    
    // Generate 2-3 variations
    for (let i = 0; i < 2; i++) {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [
            ...messages,
            { role: "user", content: `This is variation ${i + 1}. Create a unique design approach.` }
          ],
          modalities: ["image", "text"]
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`AI gateway error for variation ${i + 1}:`, response.status, errorText);
        
        if (response.status === 429) {
          return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        if (response.status === 402) {
          return new Response(JSON.stringify({ error: "AI service payment required." }), {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        continue;
      }

      const data = await response.json();
      const choice = data.choices?.[0]?.message;
      
      if (choice?.images?.[0]?.image_url?.url) {
        thumbnails.push({
          imageUrl: choice.images[0].image_url.url,
          explanation: choice.content || `Thumbnail variation ${i + 1} optimized for ${targetPlatform} engagement.`
        });
      }
    }

    if (thumbnails.length === 0) {
      return new Response(JSON.stringify({ error: "Failed to generate thumbnails" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create generation record
    const { data: generation, error: genError } = await supabase
      .from("thumbnail_generations")
      .insert({
        user_id: user.id,
        video_title: videoTitle,
        content_category: contentCategory,
        target_platform: targetPlatform,
        original_image_url: imageBase64 ? "uploaded" : null,
        generated_thumbnails: thumbnails,
        credits_used: 1
      })
      .select()
      .single();

    if (genError) {
      console.error("Generation insert error:", genError);
      return new Response(JSON.stringify({ error: "Failed to save generation" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Deduct credits
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ credits: profile.credits - 1 })
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Credit deduction error:", updateError);
    }

    // Record credit history
    await supabase
      .from("credit_history")
      .insert({
        user_id: user.id,
        amount: -1,
        reason: `Thumbnail generation for "${videoTitle}"`,
        generation_id: generation.id
      });

    return new Response(JSON.stringify({
      success: true,
      thumbnails,
      creditsRemaining: profile.credits - 1,
      generationId: generation.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Sparkles, CreditCard, LogOut, Image as ImageIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface GeneratedThumbnail {
  imageUrl: string;
  explanation: string;
}

const ThumbnailGenerator = () => {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [contentCategory, setContentCategory] = useState('');
  const [targetPlatform, setTargetPlatform] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<GeneratedThumbnail[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
      
      // Fetch user credits
      const { data: profile } = await supabase
        .from('profiles')
        .select('credits')
        .eq('user_id', session.user.id)
        .single();
      
      if (profile) {
        setCredits(profile.credits);
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!videoTitle || !contentCategory || !targetPlatform) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (credits < 1) {
      toast({
        title: "Insufficient credits",
        description: "You need at least 1 credit to generate thumbnails",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    setThumbnails([]);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-thumbnail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          videoTitle,
          contentCategory,
          targetPlatform,
          imageBase64: uploadedImage
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate thumbnails');
      }

      setThumbnails(data.thumbnails);
      setCredits(data.creditsRemaining);
      
      toast({
        title: "Thumbnails generated!",
        description: `${data.thumbnails.length} thumbnails created. ${data.creditsRemaining} credits remaining.`
      });

    } catch (error: any) {
      toast({
        title: "Generation failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Thumbnail Generator</h1>
            <p className="text-muted-foreground">Create eye-catching thumbnails with AI</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
              <CreditCard className="h-4 w-4 text-primary" />
              <span className="font-semibold">{credits} credits</span>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Generate Thumbnails
              </CardTitle>
              <CardDescription>
                Fill in the details and upload an optional image to generate AI-powered thumbnails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Video Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter your video title"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Content Category *</Label>
                <Select value={contentCategory} onValueChange={setContentCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="cooking">Cooking</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform">Target Platform *</Label>
                <Select value={targetPlatform} onValueChange={setTargetPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youtube">YouTube (16:9)</SelectItem>
                    <SelectItem value="instagram">Instagram (1:1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Upload Image (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {uploadedImage ? (
                      <div className="space-y-2">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded" 
                          className="max-h-40 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-muted-foreground">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload an image (JPG, PNG, WebP)
                        </p>
                        <p className="text-xs text-muted-foreground">Max 5MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={generating || credits < 1}
                className="w-full"
                size="lg"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Thumbnails (1 credit)
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Generated Thumbnails</h2>
            
            {thumbnails.length === 0 && !generating && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Your generated thumbnails will appear here
                  </p>
                </CardContent>
              </Card>
            )}

            {generating && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Generating your thumbnails...</p>
                  <p className="text-sm text-muted-foreground mt-2">This may take a moment</p>
                </CardContent>
              </Card>
            )}

            {thumbnails.map((thumbnail, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-4">
                  <img 
                    src={thumbnail.imageUrl} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Variation {index + 1}</h3>
                    <p className="text-sm text-muted-foreground">{thumbnail.explanation}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = thumbnail.imageUrl;
                      link.download = `thumbnail-${index + 1}.png`;
                      link.click();
                    }}
                  >
                    Download Thumbnail
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThumbnailGenerator;

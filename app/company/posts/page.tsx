// app/company/posts/page.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Eye, Heart, MessageCircle, MoreVertical } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function CompanyPostsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", content: "", type: "update" })

  const posts = [
    {
      id: 1,
      type: "blog",
      title: "Why We're Building the Future of Work",
      content: "At TechCorp, we believe in empowering teams with cutting-edge technology...",
      likes: 234,
      comments: 45,
      views: 1523,
      publishedAt: "2 days ago",
    },
    {
      id: 2,
      type: "update",
      title: "We're Hiring! Join Our Growing Team",
      content: "Exciting news! We're expanding our engineering team and looking for talented developers...",
      likes: 189,
      comments: 28,
      views: 892,
      publishedAt: "1 week ago",
    },
    {
      id: 3,
      type: "blog",
      title: "Our Journey to Remote-First Culture",
      content: "How we transformed into a fully remote company and the lessons we learned along the way...",
      likes: 412,
      comments: 67,
      views: 2341,
      publishedAt: "2 weeks ago",
    },
  ]

  const handleCreatePost = () => {
    toast({
      title: "Post Published!",
      description: "Your post is now visible to candidates and followers.",
    })
    setShowCreatePost(false)
    setNewPost({ title: "", content: "", type: "update" })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="px-4 sm:px-6 py-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold flex-1">Posts & Blogs</h1>
          <Button size="sm" className="gap-2 text-xs sm:text-sm" onClick={() => setShowCreatePost(!showCreatePost)}>
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Create Post</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-4xl space-y-4 sm:space-y-6">
        {/* Create Post Form */}
        {showCreatePost && (
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Post Type</Label>
                <Tabs value={newPost.type} onValueChange={(value) => setNewPost({ ...newPost, type: value })}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="update">Company Update</TabsTrigger>
                    <TabsTrigger value="blog">Blog Article</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter a catchy title..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Share your thoughts, updates, or insights..."
                  rows={8}
                  className="resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePost}>Publish Post</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-2">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Total Posts</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">8.4k</p>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">1.2k</p>
              <p className="text-sm text-muted-foreground">Engagements</p>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Posts</h2>
          {posts.map((post) => (
            <Card key={post.id} className="border-2 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={post.type === "blog" ? "default" : "secondary"}>
                    {post.type === "blog" ? "Blog" : "Update"}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{post.content}</p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{post.publishedAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

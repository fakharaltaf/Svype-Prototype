"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ChevronLeft, MapPin, Users, Calendar, Briefcase, Globe, 
  Star, Building2, TrendingUp, Award, Heart
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"

export default function CompanyProfilePage() {
  const router = useRouter()
  const params = useParams()
  const companySlug = params.slug as string

  // Mock company data
  const company = {
    name: companySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    slug: companySlug,
    description: "Leading technology company focused on innovation and creating exceptional user experiences. We build products that millions of people use every day.",
    industry: "Technology",
    size: "100-500 employees",
    founded: "2015",
    location: "London, UK",
    website: "www.company.com",
    rating: 4.5,
    reviews: 127,
    culture: ["Remote-friendly", "Work-life balance", "Learning & Development", "Diverse & Inclusive"],
    benefits: ["Health Insurance", "Pension Scheme", "Flexible Hours", "Remote Work", "Learning Budget", "Stock Options"],
    openJobs: 12,
    followers: 3429
  }

  const jobs = [
    { id: "1", title: "Senior Frontend Engineer", location: "London, UK", type: "Full-time", posted: "2 days ago" },
    { id: "2", title: "Product Designer", location: "Remote", type: "Full-time", posted: "5 days ago" },
    { id: "3", title: "Backend Developer", location: "London, UK", type: "Full-time", posted: "1 week ago" },
  ]

  const reviews = [
    {
      id: "1",
      author: "Current Employee - Software Engineer",
      rating: 5,
      date: "2 months ago",
      title: "Great place to grow",
      content: "Excellent work environment with supportive colleagues and interesting projects. Good work-life balance and learning opportunities."
    },
    {
      id: "2",
      author: "Former Employee - Product Manager",
      rating: 4,
      date: "4 months ago",
      title: "Solid company culture",
      content: "Enjoyed my time here. Good benefits and the team is very collaborative. Room for improvement in some processes."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <header className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Company Profile</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 max-w-4xl mx-auto w-full">
        {/* Company Header */}
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="w-20 h-20 border-2">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-2xl">
                  {company.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{company.name}</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{company.rating}</span>
                    <span>({company.reviews} reviews)</span>
                  </div>
                  <span>•</span>
                  <span>{company.followers} followers</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Follow
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open(`https://${company.website}`, '_blank')}>
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Building2 className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Industry</p>
                <p className="text-sm font-semibold">{company.industry}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Company Size</p>
                <p className="text-sm font-semibold">{company.size}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Founded</p>
                <p className="text-sm font-semibold">{company.founded}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Briefcase className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Open Roles</p>
                <p className="text-sm font-semibold">{company.openJobs}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                <span className="text-sm">{company.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="about">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="jobs">Jobs ({company.openJobs})</TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-4">
            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold">About Us</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {company.description}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We're passionate about building products that make a difference. Our team is dedicated to innovation, collaboration, and continuous improvement. Join us in shaping the future of technology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold">Benefits & Perks</h3>
                <div className="flex flex-wrap gap-2">
                  {company.benefits.map((benefit) => (
                    <Badge key={benefit} variant="secondary" className="text-sm">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-4">
            {jobs.map((job) => (
              <Card 
                key={job.id}
                className="border-2 hover:border-primary/50 transition-all cursor-pointer"
                onClick={() => router.push(`/protected/job/${job.id}`)}
              >
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <Briefcase className="w-3 h-3" />
                          {job.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Posted {job.posted}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Culture Tab */}
          <TabsContent value="culture" className="space-y-4">
            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold">Our Culture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {company.culture.map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <Award className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold">What Our Employees Say</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground italic">
                      "Great team culture and leadership. Everyone is supportive and willing to help each other grow."
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">- Software Engineer</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground italic">
                      "Best work-life balance I've experienced. The flexibility to work remotely is amazing."
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">- Product Designer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl font-bold">{company.rating}</span>
                      <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">{company.reviews} reviews</p>
                  </div>
                  <Button>Write Review</Button>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{review.author}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold mb-2">{review.title}</h4>
                      <p className="text-sm text-muted-foreground">{review.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

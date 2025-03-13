"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Clock, JapaneseYenIcon as Yen } from "lucide-react"


export default function RestaurantSearch() {
  return (
    <div className="container mx-auto py-6 px-8 md:px-12 lg:px-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center mb-4">おすすめレストラン</h1>
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">詳細検索</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>詳細検索</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="keyword">キーワード</Label>
                  <Input id="keyword" placeholder="料理名、店名など" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="purpose">目的</Label>
                  <Select>
                    <SelectTrigger id="purpose">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">接待</SelectItem>
                      <SelectItem value="different-industry">異業種交流</SelectItem>
                      <SelectItem value="date">デート</SelectItem>
                      <SelectItem value="family">家族</SelectItem>
                      <SelectItem value="friends">友人との会食</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>距離</Label>
                  <RadioGroup defaultValue="500m">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="500m" id="r1" />
                      <Label htmlFor="r1">500m未満</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1km" id="r2" />
                      <Label htmlFor="r2">1.0km未満</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1.5km" id="r3" />
                      <Label htmlFor="r3">1.0km〜1.5km</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2km" id="r4" />
                      <Label htmlFor="r4">1.5km〜2.0km</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid gap-2">
                  <Label>予算</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1000-3000">1,000円〜3,000円</SelectItem>
                      <SelectItem value="3000-5000">3,000円〜5,000円</SelectItem>
                      <SelectItem value="5000-8000">5,000円〜8,000円</SelectItem>
                      <SelectItem value="8000-10000">8,000円〜10,000円</SelectItem>
                      <SelectItem value="10000+">10,000円以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="private-room" />
                  <Label htmlFor="private-room">個室あり</Label>
                </div>

                <Button className="w-full mt-2">検索する</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      {/* 
        Note: In production, replace the static data with API call:
        
        useEffect(() => {
          async function fetchRestaurants() {
            const response = await fetch('/api/restaurants');
            const data = await response.json();
            setRestaurants(data);
          }
          fetchRestaurants();
        }, []);
      */}
    </div>
  )
}


function RestaurantCard({ restaurant }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex h-full">
        <div className="w-1/3">
          <img
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-2/3 p-4">
          <h3 className="font-bold text-lg">{restaurant.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>

          <div className="flex items-center text-sm mb-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{restaurant.location}</span>
          </div>

          <div className="flex items-center text-sm mb-1">
            <Clock className="h-4 w-4 mr-1" />
            <span>{restaurant.hours}</span>
          </div>

          <div className="flex items-center text-sm">
            <Yen className="h-4 w-4 mr-1" />
            <span>{restaurant.price}</span>
          </div>

          {restaurant.privateRoom && (
            <div className="mt-2">
              <span className="bg-muted px-2 py-1 rounded-md text-xs">個室あり</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

// サンプルデータ
const restaurants = [
  {
    id: 1,
    name: "和食 たかはし",
    cuisine: "和食",
    location: "東京都渋谷区 0.5km",
    hours: "11:00-22:00",
    price: "3,000円〜5,000円",
    privateRoom: true,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "イタリアン ベラヴィスタ",
    cuisine: "イタリアン",
    location: "東京都渋谷区 0.8km",
    hours: "17:00-23:00",
    price: "5,000円〜8,000円",
    privateRoom: true,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "中華料理 龍門",
    cuisine: "中華料理",
    location: "東京都渋谷区 1.2km",
    hours: "11:30-22:30",
    price: "3,000円〜5,000円",
    privateRoom: false,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "焼肉 和牛亭",
    cuisine: "焼肉",
    location: "東京都渋谷区 1.5km",
    hours: "17:00-23:30",
    price: "8,000円〜10,000円",
    privateRoom: true,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "寿司 海鮮",
    cuisine: "寿司",
    location: "東京都渋谷区 0.3km",
    hours: "11:30-22:00",
    price: "10,000円以上",
    privateRoom: true,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "フレンチ ル・シエル",
    cuisine: "フレンチ",
    location: "東京都渋谷区 1.8km",
    hours: "18:00-23:00",
    price: "10,000円以上",
    privateRoom: true,
    image: "/placeholder.svg?height=200&width=200",
  },
]


import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Upload,
  Image as ImageIcon,
  MoreHorizontal,
  Eye,
  Edit,
  Download,
  Trash2,
} from "lucide-react";

const mockImages = [
  {
    id: "1",
    deckName: "Premium Playing Cards",
    url: "/images/deck1.jpg",
    altText: "Front view",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    deckName: "Tarot Deck Deluxe",
    url: "/images/deck2.jpg",
    altText: "Card spread",
    createdAt: "2024-02-15",
  },
  {
    id: "3",
    deckName: "Custom Game Cards",
    url: "/images/deck3.jpg",
    altText: "Box design",
    createdAt: "2024-03-20",
  },
];

export function MediaTab() {
  return (
    <TabsContent value="media" className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Media Management</CardTitle>
              <CardDescription>Manage images and media files</CardDescription>
            </div>
            <Button>
              <Upload className="mr-2 size-4" />
              Upload Image
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search images..." className="pl-9" />
            </div>

            {/* Images Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockImages.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <ImageIcon className="size-12 text-muted-foreground" />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-sm">
                          {image.deckName}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {image.altText || "No description"}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 size-4" />
                            View Full
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 size-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 size-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                      <span>{image.createdAt}</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

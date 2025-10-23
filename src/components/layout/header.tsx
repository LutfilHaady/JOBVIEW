'use client';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bell } from 'lucide-react';

const getPageTitle = (pathname: string) => {
  if (pathname.startsWith('/dashboard')) return 'Dashboard';
  if (pathname.startsWith('/trends')) return 'Industry Comparison';
  if (pathname.startsWith('/courses')) return 'Course Search';
  if (pathname.startsWith('/roadmap')) return 'Career Roadmap';
  return 'JobView';
};

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const avatarUrl =
    PlaceHolderImages.find((img) => img.id === 'avatar1')?.imageUrl ??
    'https://picsum.photos/seed/avatar1/40/40';

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="hidden font-headline text-xl font-semibold md:block md:text-2xl">
        {getPageTitle(pathname)}
      </h1>
      <div className="ml-auto flex items-center gap-4">
        {/* Notification Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Placeholder notifications */}
            <DropdownMenuItem>
              System will be down for maintenance on Friday at 11 PM.
            </DropdownMenuItem>
            <DropdownMenuItem>
              Check out the new update! New features are now available.
            </DropdownMenuItem>
            <DropdownMenuItem>
              New courses added! Explore now.
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full"
            >
              <Avatar className="h-10 w-10 border-2 border-primary/50">
                <AvatarImage
                  src={avatarUrl}
                  alt="User Avatar"
                  data-ai-hint="person face"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/');
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { supabase } from '@/lib/supabaseClient';

export function UserProfileCard() {
  const avatarUrl = PlaceHolderImages.find(img => img.id === 'avatar1')?.imageUrl ?? "https://picsum.photos/seed/avatar1/100/100";

  // Profile state
  const [user, setUser] = useState<any>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [bio, setBio] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingBio, setEditingBio] = useState(false);

  // Load user data on mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user);
      setJobTitle(data?.user?.user_metadata?.job_title || 'Click to edit your job title');
      setBio(data?.user?.user_metadata?.bio || 'Click to edit your profile description');
    });
  }, []);

  // Update metadata in Supabase
  async function saveProfileField(field: 'job_title' | 'bio', value: string) {
    await supabase.auth.updateUser({ data: { [field]: value } });
    if (field === 'job_title') setEditingTitle(false);
    if (field === 'bio') setEditingBio(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl} alt="User Avatar" data-ai-hint="person face" />
            <AvatarFallback>
              {(user?.user_metadata?.full_name || user?.email || 'Your Name').split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="font-headline text-2xl">{user?.user_metadata?.full_name || user?.email || "Your Name"}</CardTitle>
            {editingTitle ? (
              <input
                className="border rounded px-1 py-0.5"
                value={jobTitle}
                autoFocus
                onChange={e => setJobTitle(e.target.value)}
                onBlur={() => saveProfileField('job_title', jobTitle)}
                onKeyDown={e => {
                  if (e.key === 'Enter') saveProfileField('job_title', jobTitle);
                  if (e.key === 'Escape') { setEditingTitle(false); setJobTitle(user?.user_metadata?.job_title || ''); }
                }}
              />
            ) : (
              <CardDescription
                onClick={() => setEditingTitle(true)}
                className="cursor-pointer hover:underline"
                title="Click to edit"
              >
                {jobTitle}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {editingBio ? (
          <textarea
            className="border rounded px-1 py-0.5 w-full"
            value={bio}
            autoFocus
            rows={2}
            onChange={e => setBio(e.target.value)}
            onBlur={() => saveProfileField('bio', bio)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                saveProfileField('bio', bio);
              }
              if (e.key === 'Escape') { setEditingBio(false); setBio(user?.user_metadata?.bio || ''); }
            }}
          />
        ) : (
          <p
            className="text-sm text-muted-foreground cursor-pointer hover:underline"
            onClick={() => setEditingBio(true)}
            title="Click to edit"
          >
            {bio}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

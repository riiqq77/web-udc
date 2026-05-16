import { useState } from 'react';
import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import FileUpload from '@/components/ui/FileUpload';
import { orgInfo } from '@/data/mockData';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    name: orgInfo.name, tagline: orgInfo.tagline, description: orgInfo.description,
    email: orgInfo.email, phone: orgInfo.phone, address: orgInfo.address,
    instagram: orgInfo.instagram, youtube: orgInfo.youtube, linkedin: orgInfo.linkedin, github: orgInfo.github,
    heroTitle: 'Untirta Digital Creative', heroSubtitle: orgInfo.tagline,
    footerText: '© 2025 UDC — Untirta Digital Creative. All rights reserved.',
  });

  const update = (key, val) => setSettings(prev => ({ ...prev, [key]: val }));
  const handleSave = () => toast.success('Pengaturan berhasil disimpan');

  return (
    <div className="space-y-6 max-w-4xl">
      <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Pengaturan Website</h1><p className="text-sm text-neutral-500 mt-1">Kelola informasi organisasi dan konten website</p></div>

      {/* Profil Organisasi */}
      <Card>
        <CardHeader><h3 className="font-semibold text-neutral-900 dark:text-white">Profil Organisasi</h3></CardHeader>
        <CardContent className="space-y-4">
          <Input label="Nama Organisasi" value={settings.name} onChange={e => update('name', e.target.value)} />
          <Input label="Tagline" value={settings.tagline} onChange={e => update('tagline', e.target.value)} />
          <Textarea label="Deskripsi" rows={3} value={settings.description} onChange={e => update('description', e.target.value)} />
          <FileUpload label="Logo Organisasi" accept="image/*" />
        </CardContent>
      </Card>

      {/* Kontak */}
      <Card>
        <CardHeader><h3 className="font-semibold text-neutral-900 dark:text-white">Informasi Kontak</h3></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Email" value={settings.email} onChange={e => update('email', e.target.value)} />
            <Input label="Telepon" value={settings.phone} onChange={e => update('phone', e.target.value)} />
          </div>
          <Textarea label="Alamat" rows={2} value={settings.address} onChange={e => update('address', e.target.value)} />
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader><h3 className="font-semibold text-neutral-900 dark:text-white">Media Sosial</h3></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Instagram" value={settings.instagram} onChange={e => update('instagram', e.target.value)} />
            <Input label="YouTube" value={settings.youtube} onChange={e => update('youtube', e.target.value)} />
            <Input label="LinkedIn" value={settings.linkedin} onChange={e => update('linkedin', e.target.value)} />
            <Input label="GitHub" value={settings.github} onChange={e => update('github', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Hero Content */}
      <Card>
        <CardHeader><h3 className="font-semibold text-neutral-900 dark:text-white">Hero Section</h3></CardHeader>
        <CardContent className="space-y-4">
          <Input label="Judul Hero" value={settings.heroTitle} onChange={e => update('heroTitle', e.target.value)} />
          <Input label="Subtitle Hero" value={settings.heroSubtitle} onChange={e => update('heroSubtitle', e.target.value)} />
        </CardContent>
      </Card>

      {/* Footer */}
      <Card>
        <CardHeader><h3 className="font-semibold text-neutral-900 dark:text-white">Footer</h3></CardHeader>
        <CardContent><Input label="Footer Text" value={settings.footerText} onChange={e => update('footerText', e.target.value)} /></CardContent>
      </Card>

      <div className="flex justify-end"><Button icon={Save} size="lg" onClick={handleSave}>Simpan Pengaturan</Button></div>
    </div>
  );
}

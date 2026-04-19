import { useState, useRef } from 'react';
import { AdminLayout } from '@/admin/components/AdminLayout';
import { useStorage, getPublicUrl } from '@workspace/esaora-core/hooks/useStorage';
import { Loader2, Copy, Trash2, ImagePlus, Check, AlertCircle, File, Folder, Download } from 'lucide-react';
import { supabase } from '@workspace/esaora-core/lib/supabase';

const BUCKETS = [
  { id: 'images', name: 'Images', icon: <ImagePlus className="w-5 h-5" /> },
  { id: 'documents', name: 'Documents', icon: <File className="w-5 h-5" /> },
  { id: 'partner-logos', name: 'Partner Logos', icon: <Folder className="w-5 h-5" /> },
  { id: 'team-photos', name: 'Team Photos', icon: <Folder className="w-5 h-5" /> }
];

export default function MediaLibrary() {
  const [activeBucket, setActiveBucket] = useState('images');
  const { files, loading, error, uploading, uploadFile, deleteFile, fetchFiles } = useStorage(activeBucket);
  
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    
    // Upload multiple files 
    for (let i = 0; i < fileList.length; i++) {
        await uploadFile(fileList[i]);
    }
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCopyUrl = (filePath: string) => {
    const url = getPublicUrl(activeBucket, filePath);
    navigator.clipboard.writeText(url);
    setCopiedUrl(filePath);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = async (fileName: string) => {
    setDeleting(fileName);
    try {
      await deleteFile(fileName);
    } finally {
      setDeleting(null);
      setConfirmDelete(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <AdminLayout breadcrumbs={[{ label: 'Dashboard', href: '/admin' }, { label: 'Media Library' }]}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 font-bold text-xl">Media Library</h2>
          <p className="text-gray-400 text-sm mt-0.5">Manage your digital assets and files.</p>
        </div>
        <div>
            <button 
                onClick={() => fileInputRef.current?.click()} 
                disabled={uploading}
                className="flex items-center gap-2 bg-[#0D2417] hover:bg-[#1a3f28] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
            >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
                Upload Files
            </button>
            <input 
                ref={fileInputRef} 
                type="file" 
                multiple 
                className="hidden" 
                onChange={handleUpload} 
            />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg p-3 text-red-600 text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 mb-6 pb-2">
        {BUCKETS.map(bucket => (
            <button
                key={bucket.id}
                onClick={() => setActiveBucket(bucket.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 ${
                    activeBucket === bucket.id 
                    ? 'border-[#00d2ff] text-[#001833] bg-gray-50' 
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
            >
                {bucket.icon}
                {bucket.name}
            </button>
        ))}
      </div>

      <div className="bg-white rounded-[6px] border border-gray-200 min-h-[500px] overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[500px]">
            <Loader2 className="w-8 h-8 animate-spin text-gray-300 mb-2" />
            <span className="text-gray-400 text-sm">Loading media...</span>
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[500px]">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <ImagePlus className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No files in this bucket</p>
            <p className="text-gray-400 text-sm mt-1">Upload a file to get started.</p>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {files.map((file) => {
               const url = getPublicUrl(activeBucket, file.name);
               const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name);
               
               return (
                <div key={file.name} className="group border border-gray-200 rounded-lg overflow-hidden bg-gray-50 hover:border-[#00d2ff] hover:shadow-md transition-all relative">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                        {isImage ? (
                            <img src={url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                            <File className="w-12 h-12 text-gray-300" />
                        )}
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                             <a 
                                href={url} 
                                target="_blank" 
                                rel="noreferrer"
                                title="View/Download"
                                className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors"
                             >
                                <Download className="w-4 h-4" />
                             </a>
                             <button
                                onClick={() => handleCopyUrl(file.name)}
                                title="Copy URL"
                                className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors"
                             >
                                {copiedUrl === file.name ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                             </button>
                             <button
                                onClick={() => setConfirmDelete(file.name)}
                                title="Delete"
                                className="p-2 bg-red-500/80 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-colors"
                             >
                                <Trash2 className="w-4 h-4" />
                             </button>
                        </div>
                    </div>
                    <div className="p-3">
                        <p className="text-xs font-medium text-gray-800 truncate" title={file.name}>{file.name}</p>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-[10px] text-gray-500">{formatFileSize(file.metadata?.size || 0)}</span>
                            <span className="text-[10px] text-gray-400">{new Date(file.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
               );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[6px] shadow-sm p-6 w-full max-w-sm">
            <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Delete File?</h3>
            <p className="text-gray-500 text-sm mb-5">This action cannot be undone. Any references to this URL will break.</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setConfirmDelete(null)} 
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(confirmDelete)} 
                disabled={!!deleting} 
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

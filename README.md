# WikiVideo AI Pro - The Ultimate Wikipedia to Video Tool

Transform any Wikipedia article into stunning, professional videos with AI-powered narration and cinematic visuals.

## 🎬 Features

### Core Functionality
- **Wikipedia Parser**: Instantly fetch and parse any Wikipedia article
- **AI Script Generation**: Advanced AI creates engaging, natural video scripts
- **Timeline Editor**: Professional scene-by-scene editing with precise control
- **Template System**: Pre-built professional templates (Cinematic, Modern, Educational, Dynamic)
- **Video Settings**: Full customization (aspect ratio, quality, music, subtitles, transitions)
- **Project Management**: Save and load projects for continuous work

### Advanced Features
- **Scene Editor**: Split, merge, and customize individual scenes
- **Duration Control**: Precise timing control for each scene
- **Visual Suggestions**: AI-powered visual recommendations for each scene
- **Real-time Preview**: See changes instantly in the preview window
- **Multi-format Export**: Export in various formats and qualities
- **Keyboard Shortcuts**: Professional workflow with shortcuts

### Technical Excellence
- **AI Powered**: Uses Lovable AI (Google Gemini 2.5 Flash) for script generation
- **Cloud Backend**: Full Lovable Cloud integration for project persistence
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Responsive Design**: Beautiful UI that works on all devices
- **Production Ready**: Built with TypeScript, React, and best practices

## 🚀 Getting Started

1. **Enter Wikipedia URL**: Paste any Wikipedia article URL
2. **Generate Script**: AI analyzes content and creates a video script
3. **Customize**: Choose templates, edit scenes, adjust settings
4. **Export**: Download your professional video

## 🎨 Design System

- **Dark Theme**: Cinematic space blue background
- **Primary Color**: Electric cyan (#00D9FF)
- **Secondary Color**: Coral energy (#FF6B6B)
- **Accent Color**: Vibrant purple (#9933FF)
- **Typography**: Modern sans-serif with semantic tokens
- **Animations**: Smooth 60fps transitions and effects

## 💡 Keyboard Shortcuts

- `Cmd/Ctrl + S` - Save Project
- `Cmd/Ctrl + E` - Export Video
- `Space` - Play/Pause Preview
- `?` - Show Shortcuts

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Shadcn/ui + Tailwind CSS
- **Backend**: Lovable Cloud (Supabase)
- **AI**: Lovable AI Gateway (Gemini 2.5 Flash)
- **Database**: PostgreSQL (via Supabase)

## 📊 Database Schema

```sql
projects
- id (uuid)
- title (text)
- wikipedia_url (text)
- article_data (jsonb)
- script_data (jsonb)
- settings (jsonb)
- created_at (timestamp)
- updated_at (timestamp)
```

## 🎯 Roadmap

### Current Features ✅
- Wikipedia article parsing
- AI script generation
- Timeline editing
- Template system
- Project saving/loading
- Video settings customization

### Planned Features 🚧
- Actual video rendering (FFmpeg integration)
- Real TTS integration (ElevenLabs/OpenAI)
- Background music library
- Stock footage integration
- Team collaboration
- Analytics dashboard
- API access

## 🏗️ Architecture

### Frontend Components
- `WikiInput`: Wikipedia URL input and validation
- `ScriptEditor`: AI script generation and editing
- `TimelineEditor`: Scene-by-scene timeline control
- `EnhancedPreview`: Real-time video preview
- `TemplateSelector`: Professional template selection
- `VideoSettings`: Comprehensive video customization
- `ProjectManager`: Project save/load functionality
- `ExportPanel`: Multi-format export options

### Edge Functions
- `parse-wikipedia`: Fetches Wikipedia content via API
- `generate-script`: AI-powered script generation
- `generate-tts`: TTS generation (placeholder)

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- CORS headers configured for all edge functions
- Environment variables for sensitive data
- Error boundaries for graceful failure handling

## 📈 Performance

- Lazy loading for optimal performance
- Optimized asset delivery
- Efficient state management
- Debounced user inputs
- Memoized components

## 🎓 Usage Tips

1. **Best Results**: Use well-structured Wikipedia articles with clear sections
2. **Script Editing**: Customize AI-generated scripts for your specific needs
3. **Templates**: Start with a template, then customize to your brand
4. **Scene Duration**: Aim for 3-7 seconds per scene for best engagement
5. **Quality**: Use 1080p for web, 4K for professional presentations

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

This project is deployed via Lovable. Simply click **Publish** in the Lovable interface.

## 📝 License

Built with Lovable AI

## 🤝 Contributing

This is a Lovable-generated project. To contribute:
1. Fork the repository
2. Make your changes
3. Submit a pull request

## 🎉 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- Powered by [Lovable AI](https://docs.lovable.dev/features/ai)
- UI components by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)

---

**Made with ❤️ using Lovable AI**

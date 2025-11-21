# Firebase Integration Guide

Detta är en frontend-demo av Chatbot UI. Backend ska kopplas till Firebase istället för Supabase.

## Nuvarande Status

✅ Frontend installerad och redo
⏳ Backend behöver kopplas till Firebase
⏳ AI-integration behöver implementeras

## Vad du behöver göra för Firebase-integration

### 1. Firebase Setup

1. Skapa ett Firebase-projekt på [Firebase Console](https://console.firebase.google.com/)
2. Aktivera följande tjänster:
   - **Authentication** (Email/Password)
   - **Firestore Database** (för att spara chatkonversationer)
   - **Storage** (för filuppladdning)

### 2. Ersätt Supabase med Firebase

Projektet använder för närvarande Supabase. Du behöver ersätta följande:

#### Filer som använder Supabase (behöver modifieras):
- `lib/` - Utility-funktioner för databas
- `db/` - Databasoperationer
- `context/` - Context providers för auth och data
- `app/` - API routes och serverfunktioner

#### Vad du behöver ändra:

**Authentication:**
```typescript
// Nuvarande (Supabase):
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Ändra till (Firebase):
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
```

**Database:**
```typescript
// Nuvarande (Supabase):
const { data, error } = await supabase.from('chats').select('*')

// Ändra till (Firebase):
import { collection, getDocs } from 'firebase/firestore'
const chatsRef = collection(db, 'chats')
const snapshot = await getDocs(chatsRef)
```

### 3. Environment Variables

Uppdatera `.env.local` med dina Firebase-credentials:

```bash
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=din-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ditt-projekt.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ditt-projekt-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ditt-projekt.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=ditt-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=ditt-app-id

# AI API Keys (lägg till din AI-provider)
OPENAI_API_KEY=din-openai-key
# eller
ANTHROPIC_API_KEY=din-anthropic-key
```

### 4. Firestore Database Schema

Skapa följande collections i Firestore:

**users**
```javascript
{
  id: string,
  email: string,
  created_at: timestamp,
  updated_at: timestamp
}
```

**workspaces**
```javascript
{
  id: string,
  user_id: string,
  name: string,
  created_at: timestamp
}
```

**chats**
```javascript
{
  id: string,
  user_id: string,
  workspace_id: string,
  name: string,
  created_at: timestamp,
  updated_at: timestamp
}
```

**messages**
```javascript
{
  id: string,
  chat_id: string,
  user_id: string,
  role: 'user' | 'assistant',
  content: string,
  created_at: timestamp
}
```

**files**
```javascript
{
  id: string,
  user_id: string,
  name: string,
  type: string,
  size: number,
  url: string,
  created_at: timestamp
}
```

### 5. AI Integration

För AI-chat funktionaliteten, skapa Firebase Functions eller Next.js API routes:

**Exempel: `/app/api/chat/route.ts`**
```typescript
import { OpenAI } from 'openai'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: messages,
    stream: true
  })

  // Returnera streaming response
  return new Response(response.body, {
    headers: { 'Content-Type': 'text/event-stream' }
  })
}
```

### 6. Köra Demo-sajten

När du har konfigurerat Firebase:

```bash
npm run dev
```

Sajten kommer köra på `http://localhost:3000`

## Nästa Steg

1. ✅ Frontend är installerad
2. ⏳ Konfigurera Firebase-projekt
3. ⏳ Ersätt Supabase-kod med Firebase
4. ⏳ Implementera AI-integration
5. ⏳ Testa och deploya

## Resurser

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Quickstart](https://firebase.google.com/docs/firestore/quickstart)
- [OpenAI API](https://platform.openai.com/docs)
- [Anthropic API](https://docs.anthropic.com/)

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
          avatar_url: string | null
          location: string | null
          bio: string | null
          sustainability_score: number
          completed_challenges: number
          streak: number
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          name: string
          avatar_url?: string | null
          location?: string | null
          bio?: string | null
          sustainability_score?: number
          completed_challenges?: number
          streak?: number
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          avatar_url?: string | null
          location?: string | null
          bio?: string | null
          sustainability_score?: number
          completed_challenges?: number
          streak?: number
        }
      }
      eco_actions: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          impact_carbon: number
          impact_water: number
          impact_waste: number
          impact_energy: number
          difficulty: string
          category: string
          image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          impact_carbon: number
          impact_water: number
          impact_waste: number
          impact_energy: number
          difficulty: string
          category: string
          image_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          impact_carbon?: number
          impact_water?: number
          impact_waste?: number
          impact_energy?: number
          difficulty?: string
          category?: string
          image_url?: string | null
        }
      }
      challenges: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          duration: number
          points: number
          category: string
          steps: string[]
          image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          duration: number
          points: number
          category: string
          steps: string[]
          image_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          duration?: number
          points?: number
          category?: string
          steps?: string[]
          image_url?: string | null
        }
      }
      user_challenges: {
        Row: {
          id: string
          created_at: string
          user_id: string
          challenge_id: string
          progress: number
          completed: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          challenge_id: string
          progress?: number
          completed?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          challenge_id?: string
          progress?: number
          completed?: boolean
        }
      }
      community_posts: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          content: string
          likes: number
          comments: number
          tags: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          content: string
          likes?: number
          comments?: number
          tags?: string[]
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          content?: string
          likes?: number
          comments?: number
          tags?: string[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
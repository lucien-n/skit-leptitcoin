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
      likes: {
        Row: {
          created_at: string | null
          listing_uid: string
          uid: string
          user_uid: string
        }
        Insert: {
          created_at?: string | null
          listing_uid: string
          uid?: string
          user_uid: string
        }
        Update: {
          created_at?: string | null
          listing_uid?: string
          uid?: string
          user_uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_listing_uid_fkey"
            columns: ["listing_uid"]
            referencedRelation: "listings"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "likes_user_uid_fkey"
            columns: ["user_uid"]
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          }
        ]
      }
      listings: {
        Row: {
          author_uid: string
          author_username: string | null
          category: string
          condition: number
          created_at: string | null
          description: string
          is_validated: boolean
          picture: string | null
          price: number
          title: string
          uid: string
          updated_at: string | null
          validated_at: string | null
          validated_by: string
        }
        Insert: {
          author_uid: string
          author_username?: string | null
          category?: string
          condition?: number
          created_at?: string | null
          description: string
          is_validated?: boolean
          picture?: string | null
          price: number
          title: string
          uid: string
          updated_at?: string | null
          validated_at?: string | null
          validated_by: string
        }
        Update: {
          author_uid?: string
          author_username?: string | null
          category?: string
          condition?: number
          created_at?: string | null
          description?: string
          is_validated?: boolean
          picture?: string | null
          price?: number
          title?: string
          uid?: string
          updated_at?: string | null
          validated_at?: string | null
          validated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_author_uid_fkey"
            columns: ["author_uid"]
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "listings_author_username_fkey"
            columns: ["author_username"]
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "listings_validated_by_fkey"
            columns: ["validated_by"]
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          rating: number
          rating_count: number
          role: number
          uid: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          rating?: number
          rating_count?: number
          role?: number
          uid: string
          updated_at?: string | null
          username?: string
        }
        Update: {
          created_at?: string | null
          rating?: number
          rating_count?: number
          role?: number
          uid?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_uid_fkey"
            columns: ["uid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          rated: string
          rater: string
          uid: string
          value: number
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          rated: string
          rater: string
          uid?: string
          value: number
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          rated?: string
          rater?: string
          uid?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "ratings_rated_fkey"
            columns: ["rated"]
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "ratings_rater_fkey"
            columns: ["rater"]
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_average_rating: {
        Args: {
          profile_uid: string
        }
        Returns: number
      }
      calculate_rating_count: {
        Args: {
          profile_uid: string
        }
        Returns: number
      }
      get_author_username: {
        Args: {
          author_uid: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

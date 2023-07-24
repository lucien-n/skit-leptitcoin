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
          id: number
          listing_uid: string | null
          user_uid: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          listing_uid?: string | null
          user_uid: string
        }
        Update: {
          created_at?: string | null
          id?: number
          listing_uid?: string | null
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      listings: {
        Row: {
          author_uid: string | null
          category: string | null
          condition: number | null
          created_at: string | null
          description: string | null
          is_validated: boolean | null
          picture: string | null
          price: number | null
          title: string | null
          uid: string
          validated_at: string | null
          validated_by: string | null
        }
        Insert: {
          author_uid?: string | null
          category?: string | null
          condition?: number | null
          created_at?: string | null
          description?: string | null
          is_validated?: boolean | null
          picture?: string | null
          price?: number | null
          title?: string | null
          uid: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Update: {
          author_uid?: string | null
          category?: string | null
          condition?: number | null
          created_at?: string | null
          description?: string | null
          is_validated?: boolean | null
          picture?: string | null
          price?: number | null
          title?: string | null
          uid?: string
          validated_at?: string | null
          validated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_author_uid_fkey"
            columns: ["author_uid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_validated_by_fkey"
            columns: ["validated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          rating: number | null
          rating_count: number | null
          restricted: boolean | null
          restricted_at: string | null
          restricted_by: string | null
          role: number
          uid: string
          username: string
        }
        Insert: {
          created_at?: string | null
          rating?: number | null
          rating_count?: number | null
          restricted?: boolean | null
          restricted_at?: string | null
          restricted_by?: string | null
          role?: number
          uid: string
          username: string
        }
        Update: {
          created_at?: string | null
          rating?: number | null
          rating_count?: number | null
          restricted?: boolean | null
          restricted_at?: string | null
          restricted_by?: string | null
          role?: number
          uid?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_restricted_by_fkey"
            columns: ["restricted_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
          created_at: string | null
          rated: string
          rater: string
          value: number | null
        }
        Insert: {
          created_at?: string | null
          rated: string
          rater: string
          value?: number | null
        }
        Update: {
          created_at?: string | null
          rated?: string
          rater?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_rated_fkey"
            columns: ["rated"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_rater_fkey"
            columns: ["rater"]
            referencedRelation: "users"
            referencedColumns: ["id"]
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
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

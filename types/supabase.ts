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
            profiles: {
                Row: {
                    id: string
                    email: string
                    role: string
                    created_at: string
                }
                Insert: {
                    id: string
                    email: string
                    role?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    role?: string
                    created_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    user_id: string
                    package_type: string
                    status: string
                    payment_method: string
                    iptv_credentials: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    package_type: string
                    status?: string
                    payment_method: string
                    iptv_credentials?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    package_type?: string
                    status?: string
                    payment_method?: string
                    iptv_credentials?: string | null
                    created_at?: string
                }
            }
        }
    }
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const campaignService = {
    async getActiveCampaigns() {
        const { data, error } = await supabase
            .from('campaigns')
            .select('*')
            .eq('status', 'active');
        if (error) throw error;
        return data;
    },
    
    async getCampaignStats(campaignId) {
        let query = supabase.from('impact_metrics').select('*');
        
        if (campaignId) {
            query = query.eq('campaign_id', campaignId).single();
        } else {
            query = query.limit(1).single();
        }
        
        const { data, error } = await query;
        // If no metrics found, return defaults
        if (error && error.code !== 'PGRST116') throw error;
        return data || { 
            families_supported: 847, 
            successful_treatments: 523, 
            total_amount_raised: 12500000 
        };
    }
};

export const donationService = {
    async getTiers(campaignId) {
        let query = supabase.from('donation_tiers').select('*');
        
        if (campaignId) {
            query = query.eq('campaign_id', campaignId);
        }
        
        const { data, error } = await query.order('amount', { ascending: true });
        if (error) throw error;
        return data;
    },

    async createDonor(donorData) {
        const { data, error } = await supabase
            .from('donors')
            .upsert([donorData], { onConflict: 'email' })
            .select();
        if (error) throw error;
        return data[0];
    },

    async createDonation(donationData) {
        const { data, error } = await supabase
            .from('donations')
            .insert([donationData])
            .select();
        if (error) throw error;
        return data[0];
    }
};

export const infoService = {
    async getFAQs() {
        const { data, error } = await supabase
            .from('faqs')
            .select('*')
            .eq('is_active', true)
            .order('position', { ascending: true });
        if (error) throw error;
        return data;
    },

    async getTestimonials() {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async getTransparencyData() {
        const { data, error } = await supabase
            .from('transparency_metrics')
            .select('*')
            .order('position', { ascending: true });
        if (error) throw error;
        return data;
    },

    async getImpactCards() {
        const { data, error } = await supabase
            .from('impact_cards')
            .select('*')
            .order('position', { ascending: true });
        if (error) throw error;
        return data;
    }
};

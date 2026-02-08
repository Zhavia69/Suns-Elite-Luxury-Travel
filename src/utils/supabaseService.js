import { supabase } from '../lib/supabase';

// Transportation Services API
export const transportService = {
  // Get all services with optional filtering
  async getServices(filters = {}) {
    try {
      let query = supabase?.from('services')?.select(`
          *,
          service_pricing(*),
          service_vehicles(*)
        `)?.eq('is_active', true);

      if (filters?.category && filters?.category !== 'all') {
        query = query?.eq('category', filters?.category);
      }

      if (filters?.isPopular) {
        query = query?.eq('is_popular', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      throw error;
    }
  },

  // Get single service by ID
  async getServiceById(serviceId) {
    try {
      const { data, error } = await supabase?.from('services')?.select(`
          *,
          service_pricing(*),
          service_vehicles(*)
        `)?.eq('id', serviceId)?.single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Create new service (admin only)
  async createService(serviceData) {
    try {
      const { data, error } = await supabase?.from('services')?.insert([serviceData])?.select()?.single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Update service (admin only)
  async updateService(serviceId, updates) {
    try {
      const { data, error } = await supabase?.from('services')?.update(updates)?.eq('id', serviceId)?.select()?.single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }
};

// Bookings API
export const bookingService = {
  // Get user's bookings
  async getUserBookings(userId) {
    try {
      const { data, error } = await supabase?.from('bookings')?.select(`*,services(name, category),vehicles(name, make, model)`)?.eq('customer_id', userId)?.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw error;
    }
  },

  // Get booking by booking number
  async getBookingByNumber(bookingNumber) {
    try {
      const { data, error } = await supabase?.from('bookings')?.select(`*,services(name, category, description),vehicles(name, make, model, license_plate),drivers(user_profiles(full_name, phone))`)?.eq('booking_number', bookingNumber)?.single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Create new booking
  async createBooking(bookingData) {
    try {
      const { data, error } = await supabase?.from('bookings')?.insert([{
          ...bookingData,
          booking_number: `ST${Date.now()}`
        }])?.select(`
          *,
          services(name, category)
        `)?.single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Update booking status
  async updateBookingStatus(bookingId, status, paymentStatus = null) {
    try {
      const updates = { status };
      if (paymentStatus) {
        updates.payment_status = paymentStatus;
      }

      const { data, error } = await supabase?.from('bookings')?.update(updates)?.eq('id', bookingId)?.select()?.single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }
};

// Fleet API
export const fleetService = {
  // Get all available vehicles
  async getVehicles(filters = {}) {
    try {
      let query = supabase?.from('vehicles')?.select('*')?.eq('is_available', true);

      if (filters?.vehicleType && filters?.vehicleType !== 'all') {
        query = query?.eq('vehicle_type', filters?.vehicleType);
      }

      const { data, error } = await query?.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      throw error;
    }
  },

  // Get vehicle by ID
  async getVehicleById(vehicleId) {
    try {
      const { data, error } = await supabase?.from('vehicles')?.select('*')?.eq('id', vehicleId)?.single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }
};

// Contact & Support API
export const contactService = {
  // Submit contact inquiry
  async submitInquiry(inquiryData) {
    try {
      const { data, error } = await supabase?.from('contact_inquiries')?.insert([inquiryData])?.select()?.single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get FAQs
  async getFAQs(category = null) {
    try {
      let query = supabase?.from('faqs')?.select('*')?.eq('is_active', true)?.order('display_order', { ascending: true });

      if (category) {
        query = query?.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      throw error;
    }
  }
};

// User Profile API  
export const userService = {
  // Get user profile
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.update(updates)?.eq('id', userId)?.select()?.single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }
};

export default {
  transportService,
  bookingService,
  fleetService,
  contactService,
  userService
};
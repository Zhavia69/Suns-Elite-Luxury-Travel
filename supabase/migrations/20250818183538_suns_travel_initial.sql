-- Location: supabase/migrations/20250818183538_suns_travel_initial.sql
-- Sun's Travel - Luxury Transportation Platform
-- Complete schema for transportation services, bookings, fleet management, and user management

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Custom Types
CREATE TYPE public.user_role AS ENUM ('customer', 'driver', 'admin', 'manager');
CREATE TYPE public.service_category AS ENUM ('airport_transfer', 'executive_ride', 'hourly_chauffeur', 'safari_gateway', 'hotel_transfer', 'corporate_transport', 'concierge_service', 'luxury_drive');
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.vehicle_type AS ENUM ('sedan', 'suv', 'van', 'luxury_sedan', 'luxury_suv', 'minibus', 'coach');
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- 3. Core Tables

-- User profiles (PostgREST compatibility)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role public.user_role DEFAULT 'customer'::public.user_role,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Service categories
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category public.service_category NOT NULL,
    description TEXT,
    full_description TEXT,
    image_url TEXT,
    gallery_urls TEXT[],
    starting_price DECIMAL(10,2) NOT NULL,
    duration TEXT,
    capacity TEXT,
    is_popular BOOLEAN DEFAULT false,
    key_features TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Service pricing options
CREATE TABLE public.service_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Vehicle options for services
CREATE TABLE public.service_vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    capacity TEXT,
    price DECIMAL(10,2) NOT NULL,
    vehicle_type public.vehicle_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Fleet vehicles
CREATE TABLE public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    make TEXT,
    model TEXT,
    year INTEGER,
    vehicle_type public.vehicle_type NOT NULL,
    capacity INTEGER,
    image_url TEXT,
    features TEXT[] DEFAULT '{}',
    is_available BOOLEAN DEFAULT true,
    license_plate TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Drivers
CREATE TABLE public.drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    license_number TEXT NOT NULL UNIQUE,
    experience_years INTEGER,
    languages TEXT[] DEFAULT '{}',
    rating DECIMAL(3,2) DEFAULT 5.00,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Bookings
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.services(id) ON DELETE RESTRICT,
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
    driver_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL,
    pickup_location TEXT NOT NULL,
    pickup_datetime TIMESTAMPTZ NOT NULL,
    dropoff_location TEXT,
    passenger_count INTEGER DEFAULT 1,
    special_requests TEXT,
    estimated_duration TEXT,
    total_amount DECIMAL(10,2) NOT NULL,
    status public.booking_status DEFAULT 'pending'::public.booking_status,
    payment_status public.payment_status DEFAULT 'pending'::public.payment_status,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Contact inquiries
CREATE TABLE public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    inquiry_type TEXT DEFAULT 'general',
    status TEXT DEFAULT 'open',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- FAQ entries
CREATE TABLE public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_services_category ON public.services(category);
CREATE INDEX idx_services_is_active ON public.services(is_active);
CREATE INDEX idx_service_pricing_service_id ON public.service_pricing(service_id);
CREATE INDEX idx_service_vehicles_service_id ON public.service_vehicles(service_id);
CREATE INDEX idx_vehicles_type ON public.vehicles(vehicle_type);
CREATE INDEX idx_vehicles_available ON public.vehicles(is_available);
CREATE INDEX idx_drivers_user_id ON public.drivers(user_id);
CREATE INDEX idx_drivers_available ON public.drivers(is_available);
CREATE INDEX idx_bookings_customer_id ON public.bookings(customer_id);
CREATE INDEX idx_bookings_service_id ON public.bookings(service_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_pickup_datetime ON public.bookings(pickup_datetime);
CREATE INDEX idx_contact_inquiries_customer_id ON public.contact_inquiries(customer_id);
CREATE INDEX idx_faqs_category ON public.faqs(category);

-- 5. Functions

-- Generate booking number
CREATE OR REPLACE FUNCTION public.generate_booking_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN 'ST' || to_char(CURRENT_TIMESTAMP, 'YYYYMMDD') || LPAD((EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::INTEGER % 10000)::TEXT, 4, '0');
END;
$$;

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- Handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'customer')::public.user_role
    );
    RETURN NEW;
END;
$$;

-- 6. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies

-- User profiles policies (Pattern 1: Core user table)
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Services policies (Pattern 4: Public read, admin write)
CREATE POLICY "public_can_read_services"
ON public.services
FOR SELECT
TO public
USING (is_active = true);

CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role IN ('admin', 'manager')
)
$$;

CREATE POLICY "admins_manage_services"
ON public.services
FOR ALL
TO authenticated
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- Service pricing policies
CREATE POLICY "public_can_read_service_pricing"
ON public.service_pricing
FOR SELECT
TO public
USING (true);

CREATE POLICY "admins_manage_service_pricing"
ON public.service_pricing
FOR ALL
TO authenticated
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- Service vehicles policies  
CREATE POLICY "public_can_read_service_vehicles"
ON public.service_vehicles
FOR SELECT
TO public
USING (true);

CREATE POLICY "admins_manage_service_vehicles"
ON public.service_vehicles
FOR ALL
TO authenticated
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- Vehicles policies
CREATE POLICY "public_can_read_vehicles"
ON public.vehicles
FOR SELECT
TO public
USING (is_available = true);

CREATE POLICY "admins_manage_vehicles"
ON public.vehicles
FOR ALL
TO authenticated
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- Drivers policies
CREATE POLICY "drivers_view_own_profile"
ON public.drivers
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.is_admin_user());

CREATE POLICY "admins_manage_drivers"
ON public.drivers
FOR ALL
TO authenticated
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- Bookings policies (Pattern 2: Simple user ownership)
CREATE POLICY "users_manage_own_bookings"
ON public.bookings
FOR ALL
TO authenticated
USING (customer_id = auth.uid())
WITH CHECK (customer_id = auth.uid());

CREATE POLICY "staff_view_all_bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (public.is_admin_user());

-- Contact inquiries policies
CREATE POLICY "users_manage_own_inquiries"
ON public.contact_inquiries
FOR ALL
TO authenticated
USING (customer_id = auth.uid())
WITH CHECK (customer_id = auth.uid());

CREATE POLICY "public_can_create_inquiries"
ON public.contact_inquiries
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "staff_view_all_inquiries"
ON public.contact_inquiries
FOR SELECT
TO authenticated
USING (public.is_admin_user());

-- FAQ policies
CREATE POLICY "public_can_read_faqs"
ON public.faqs
FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "admins_manage_faqs"
ON public.faqs
FOR ALL
TO authenticated
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- 8. Triggers
CREATE TRIGGER trigger_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trigger_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trigger_vehicles_updated_at
    BEFORE UPDATE ON public.vehicles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trigger_drivers_updated_at
    BEFORE UPDATE ON public.drivers
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trigger_bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. Mock Data
DO $$
DECLARE
    customer_uuid UUID := gen_random_uuid();
    admin_uuid UUID := gen_random_uuid();
    service1_uuid UUID := gen_random_uuid();
    service2_uuid UUID := gen_random_uuid();
    service3_uuid UUID := gen_random_uuid();
    service4_uuid UUID := gen_random_uuid();
    vehicle1_uuid UUID := gen_random_uuid();
    vehicle2_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (customer_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'customer@sunstravel.co.ke', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Doe", "role": "customer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@sunstravel.co.ke', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create services
    INSERT INTO public.services (id, name, category, description, full_description, image_url, gallery_urls, starting_price, duration, capacity, is_popular, key_features) VALUES
        (service1_uuid, 'Executive Airport Transfer', 'airport_transfer', 'Premium door-to-door airport transportation with professional chauffeurs and luxury vehicles.', 
         'Experience seamless airport transfers with our executive service. Our professional chauffeurs monitor flight schedules and provide punctual, comfortable transportation in premium vehicles.', 
         'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
         ARRAY['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop'],
         8500.00, '45-90 mins', '1-4 passengers', true, 
         ARRAY['Flight tracking & monitoring', 'Meet & greet service', 'Complimentary refreshments', 'Professional chauffeur']),
        
        (service2_uuid, 'Corporate Executive Rides', 'executive_ride', 'Professional transportation for business meetings, corporate events, and executive travel needs.',
         'Elevate your corporate image with our executive ride service. Designed for business professionals who require reliable, punctual, and sophisticated transportation.',
         'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop',
         ARRAY['https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop'],
         6500.00, '2-8 hours', '1-4 passengers', false,
         ARRAY['Professional chauffeurs', 'Corporate billing available', 'Flexible scheduling', 'Premium vehicle selection']),
         
        (service3_uuid, 'Luxury Safari Gateway', 'safari_gateway', 'Premium transportation to safari lodges and national parks with expert local guides.',
         'Begin your safari adventure in style with our luxury gateway service. We provide comfortable, air-conditioned transportation to Kenya''s premier safari destinations.',
         'https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?w=800&h=600&fit=crop',
         ARRAY['https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?w=800&h=600&fit=crop'],
         25000.00, '4-8 hours', '1-6 passengers', true,
         ARRAY['Safari-equipped vehicles', 'Expert local guides', 'Wildlife spotting expertise', 'Cultural insights']),
         
        (service4_uuid, 'Hourly Chauffeur Service', 'hourly_chauffeur', 'Dedicated chauffeur service by the hour for multiple stops, shopping, or extended city tours.',
         'Enjoy the ultimate flexibility with our hourly chauffeur service. Perfect for busy schedules with multiple appointments, shopping excursions, or leisurely city exploration.',
         'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop',
         ARRAY['https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop'],
         3500.00, 'Minimum 2 hours', '1-6 passengers', true,
         ARRAY['Flexible hourly booking', 'Multiple stops included', 'Professional chauffeur', 'Waiting time included']);

    -- Create service pricing
    INSERT INTO public.service_pricing (service_id, label, price) VALUES
        (service1_uuid, 'Per kilometer', 120.00),
        (service1_uuid, 'Waiting time (per hour)', 1500.00),
        (service1_uuid, 'Night surcharge (10pm-6am)', 2000.00),
        (service2_uuid, 'Hourly rate', 3500.00),
        (service2_uuid, 'Half-day (4 hours)', 12000.00),
        (service2_uuid, 'Full-day (8 hours)', 22000.00),
        (service3_uuid, 'Maasai Mara (one way)', 35000.00),
        (service3_uuid, 'Amboseli National Park', 28000.00),
        (service4_uuid, 'First 2 hours', 7000.00),
        (service4_uuid, 'Additional hours', 3500.00);

    -- Create vehicles
    INSERT INTO public.vehicles (id, name, make, model, year, vehicle_type, capacity, image_url, features) VALUES
        (vehicle1_uuid, 'Executive Sedan', 'Mercedes-Benz', 'E-Class', 2023, 'luxury_sedan', 4, 
         'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop',
         ARRAY['Leather interior', 'Climate control', 'WiFi', 'Premium sound system']),
        (vehicle2_uuid, 'Luxury SUV', 'Toyota', 'Land Cruiser', 2023, 'luxury_suv', 7,
         'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
         ARRAY['4WD capability', 'Premium interior', 'Entertainment system', 'Refreshment center']);

    -- Create service vehicles
    INSERT INTO public.service_vehicles (service_id, name, capacity, price, vehicle_type) VALUES
        (service1_uuid, 'Executive Sedan', '1-3 passengers', 8500.00, 'luxury_sedan'),
        (service1_uuid, 'Luxury SUV', '1-6 passengers', 12000.00, 'luxury_suv'),
        (service2_uuid, 'Executive Sedan', '1-3 passengers', 6500.00, 'luxury_sedan'),
        (service2_uuid, 'Luxury SUV', '1-6 passengers', 9500.00, 'luxury_suv'),
        (service3_uuid, 'Safari Land Cruiser', '1-6 passengers', 25000.00, 'suv'),
        (service4_uuid, 'Comfort Sedan', '1-3 passengers', 3500.00, 'sedan'),
        (service4_uuid, 'Luxury SUV', '1-6 passengers', 4500.00, 'luxury_suv');

    -- Create sample booking
    INSERT INTO public.bookings (booking_number, customer_id, service_id, vehicle_id, pickup_location, pickup_datetime, dropoff_location, passenger_count, total_amount, status) VALUES
        (public.generate_booking_number(), customer_uuid, service1_uuid, vehicle1_uuid, 'Jomo Kenyatta International Airport', 
         CURRENT_TIMESTAMP + INTERVAL '2 days', 'Nairobi CBD - Serena Hotel', 2, 8500.00, 'confirmed');

    -- Create FAQs
    INSERT INTO public.faqs (question, answer, category, display_order) VALUES
        ('How far in advance should I book?', 'We recommend booking at least 24 hours in advance for regular services and 48-72 hours for safari transfers to ensure vehicle availability.', 'booking', 1),
        ('What are your cancellation policies?', 'Free cancellation up to 12 hours before pickup. Cancellations within 12 hours may incur a 50% charge. No-shows are charged the full amount.', 'booking', 2),
        ('Do you provide child car seats?', 'Yes, we provide complimentary child car seats upon request. Please specify the age and number of children when booking.', 'services', 3),
        ('Are your drivers licensed and insured?', 'All our drivers are professionally licensed, background-checked, and fully insured. Our vehicles carry comprehensive commercial insurance.', 'safety', 4),
        ('Do you operate 24/7?', 'Yes, we provide 24/7 service including holidays. Night services (10pm-6am) may include a surcharge.', 'services', 5);

END $$;
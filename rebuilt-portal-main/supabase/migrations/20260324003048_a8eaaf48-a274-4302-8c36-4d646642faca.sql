
-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'student', 'faculty', 'exam_controller');

-- Departments table
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  hod_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Profiles table (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id TEXT NOT NULL UNIQUE,
  department_id UUID REFERENCES public.departments(id),
  semester INT NOT NULL DEFAULT 1,
  batch TEXT,
  cgpa NUMERIC(3,1) DEFAULT 0.0,
  date_of_birth DATE,
  address TEXT,
  parent_name TEXT,
  parent_phone TEXT,
  status TEXT NOT NULL DEFAULT 'Active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Faculty table
CREATE TABLE public.faculty (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  faculty_id TEXT NOT NULL UNIQUE,
  department_id UUID REFERENCES public.departments(id),
  designation TEXT NOT NULL DEFAULT 'Assistant Professor',
  experience TEXT,
  specialization TEXT,
  rating NUMERIC(2,1) DEFAULT 0.0,
  status TEXT NOT NULL DEFAULT 'Active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_code TEXT NOT NULL UNIQUE,
  course_name TEXT NOT NULL,
  department_id UUID REFERENCES public.departments(id),
  semester INT NOT NULL,
  credits INT NOT NULL DEFAULT 3,
  faculty_id UUID REFERENCES public.faculty(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Grades table
CREATE TABLE public.grades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id),
  semester INT NOT NULL,
  internal_marks NUMERIC(5,2),
  external_marks NUMERIC(5,2),
  total_marks NUMERIC(5,2),
  grade TEXT,
  grade_point NUMERIC(3,1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fees table
CREATE TABLE public.fees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  fee_type TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  paid_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  due_date DATE,
  paid_date DATE,
  status TEXT NOT NULL DEFAULT 'Pending',
  semester INT,
  academic_year TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id),
  date DATE NOT NULL,
  period INT,
  status TEXT NOT NULL DEFAULT 'Present',
  marked_by UUID REFERENCES public.faculty(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Departments: readable by all authenticated users
CREATE POLICY "Departments viewable by authenticated" ON public.departments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage departments" ON public.departments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Profiles: users see own, admins see all
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- User roles: only admins manage
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Students: own data + admin/faculty access
CREATE POLICY "Students view own data" ON public.students FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins view all students" ON public.students FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Faculty view all students" ON public.students FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'faculty'));
CREATE POLICY "Admins manage students" ON public.students FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Faculty: own data + admin access
CREATE POLICY "Faculty view own data" ON public.faculty FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins view all faculty" ON public.faculty FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage faculty" ON public.faculty FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Students view faculty" ON public.faculty FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'student'));

-- Courses: readable by all authenticated
CREATE POLICY "Courses viewable by authenticated" ON public.courses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage courses" ON public.courses FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Grades: students see own, faculty/admin see all
CREATE POLICY "Students view own grades" ON public.grades FOR SELECT TO authenticated
  USING (student_id IN (SELECT s.id FROM public.students s WHERE s.user_id = auth.uid()));
CREATE POLICY "Faculty view all grades" ON public.grades FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'faculty'));
CREATE POLICY "Admins manage grades" ON public.grades FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Faculty can insert grades" ON public.grades FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'faculty'));
CREATE POLICY "Faculty can update grades" ON public.grades FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'faculty'));

-- Fees: students see own, admin sees all
CREATE POLICY "Students view own fees" ON public.fees FOR SELECT TO authenticated
  USING (student_id IN (SELECT s.id FROM public.students s WHERE s.user_id = auth.uid()));
CREATE POLICY "Admins manage fees" ON public.fees FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Attendance: students see own, faculty/admin see all
CREATE POLICY "Students view own attendance" ON public.attendance FOR SELECT TO authenticated
  USING (student_id IN (SELECT s.id FROM public.students s WHERE s.user_id = auth.uid()));
CREATE POLICY "Faculty manage attendance" ON public.attendance FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'faculty'));
CREATE POLICY "Admins manage attendance" ON public.attendance FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faculty_updated_at BEFORE UPDATE ON public.faculty FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

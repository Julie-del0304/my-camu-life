export const PANELS = [
  { id: "admin", icon: "🏛️", label: "Admin Panel", color: "from-orange-200 to-orange-400", textColor: "text-orange-700", stats: [["Fee Collection", "95.2%"], ["Facilities", "130"], ["Compliance", "100%"]] },
  { id: "faculty", icon: "🎓", label: "Faculty Panel", color: "from-green-400 to-green-600", textColor: "text-white", stats: [["Total Faculty", "89"], ["Departments", "7"], ["Avg Rating", "4.6/5"]] },
  { id: "exam", icon: "📚", label: "Control of Exam", color: "from-teal-200 to-pink-200", textColor: "text-gray-700", stats: [["Active Courses", "156"], ["Current Semester", "Spring 2024"], ["Avg CGPA", "8.6"]] },
  { id: "student", icon: "👥", label: "Student Panel", color: "from-blue-500 to-green-500", textColor: "text-white", stats: [["Total Students", "942"], ["Active Batches", "32"], ["Avg Attendance", "91%"]] },
  { id: "facilities", icon: "🏢", label: "Other Facilities", color: "from-indigo-500 to-purple-600", textColor: "text-white", stats: [["Active Clubs", "10"], ["Hostel Blocks", "4"], ["Library Books", "50K+"]] },
];

export const DEPARTMENTS = [
  { code: "cse", name: "Computer Science Engineering", color: "bg-blue-600", from: "from-blue-50", to: "to-indigo-100", accent: "text-blue-600" },
  { code: "it", name: "Information Technology", color: "bg-cyan-600", from: "from-cyan-50", to: "to-blue-100", accent: "text-cyan-600" },
  { code: "aids", name: "Artificial Intelligence & Data Science", color: "bg-indigo-600", from: "from-indigo-50", to: "to-purple-100", accent: "text-indigo-600" },
  { code: "mech", name: "Mechanical Engineering", color: "bg-purple-600", from: "from-purple-50", to: "to-violet-100", accent: "text-purple-600" },
  { code: "ece", name: "Electronics & Communication", color: "bg-green-600", from: "from-green-50", to: "to-emerald-100", accent: "text-green-600" },
  { code: "eee", name: "Electrical & Electronics Engineering", color: "bg-yellow-600", from: "from-yellow-50", to: "to-amber-100", accent: "text-yellow-600" },
  { code: "civil", name: "Civil Engineering", color: "bg-orange-600", from: "from-orange-50", to: "to-red-100", accent: "text-orange-600" },
];

export const DEPT_STUDENT_COUNTS: Record<string, number> = {
  CSE: 330, ECE: 97, EEE: 37, MECH: 127, CIVIL: 2, IT: 100, "Science & Hum": 249,
};

export const STUDENT_USERS: Record<string, { name: string; cgpa: number; credits: number; attendance: number; pendingFees: number; totalFees: number; paid: number; semester: number; section: string; dept: string; phone: string; email: string; dob: string; parent: string; address: string }> = {
  Student001: { name: "Rajesh Kumar", cgpa: 8.7, credits: 142, attendance: 92, pendingFees: 15000, totalFees: 85000, paid: 70000, semester: 6, section: "A", dept: "CSE", phone: "+91 98765 43210", email: "rajesh.k@dmi.edu", dob: "2003-05-14", parent: "Mr. Kumar Swamy", address: "12, Anna Nagar, Chennai" },
  Student002: { name: "Priya Sharma", cgpa: 9.1, credits: 145, attendance: 95, pendingFees: 10000, totalFees: 85000, paid: 75000, semester: 6, section: "A", dept: "CSE", phone: "+91 98765 43211", email: "priya.s@dmi.edu", dob: "2003-08-22", parent: "Mr. Sharma Rajan", address: "34, T Nagar, Chennai" },
  Student003: { name: "Arjun Patel", cgpa: 8.3, credits: 138, attendance: 88, pendingFees: 20000, totalFees: 85000, paid: 65000, semester: 6, section: "B", dept: "CSE", phone: "+91 98765 43212", email: "arjun.p@dmi.edu", dob: "2003-02-11", parent: "Mr. Patel Krishnan", address: "56, Adyar, Chennai" },
  Student004: { name: "Sneha Reddy", cgpa: 8.9, credits: 148, attendance: 94, pendingFees: 5000, totalFees: 85000, paid: 80000, semester: 6, section: "A", dept: "IT", phone: "+91 98765 43213", email: "sneha.r@dmi.edu", dob: "2003-11-30", parent: "Mr. Reddy Naidu", address: "78, Velachery, Chennai" },
  Student005: { name: "Vikram Singh", cgpa: 8.5, credits: 140, attendance: 90, pendingFees: 15000, totalFees: 85000, paid: 70000, semester: 6, section: "B", dept: "ECE", phone: "+91 98765 43214", email: "vikram.s@dmi.edu", dob: "2003-07-18", parent: "Mr. Singh Rathore", address: "90, Guindy, Chennai" },
  Student006: { name: "Anitha Kumari", cgpa: 8.8, credits: 143, attendance: 93, pendingFees: 12000, totalFees: 85000, paid: 73000, semester: 6, section: "A", dept: "EEE", phone: "+91 98765 43215", email: "anitha.k@dmi.edu", dob: "2003-01-25", parent: "Mr. Kumar Raj", address: "23, Porur, Chennai" },
  Student007: { name: "Karthik Rajan", cgpa: 7.9, credits: 135, attendance: 85, pendingFees: 25000, totalFees: 85000, paid: 60000, semester: 6, section: "B", dept: "MECH", phone: "+91 98765 43216", email: "karthik.r@dmi.edu", dob: "2003-09-08", parent: "Mr. Rajan Pillai", address: "45, Tambaram, Chennai" },
  Student008: { name: "Deepika Nair", cgpa: 9.3, credits: 150, attendance: 97, pendingFees: 0, totalFees: 85000, paid: 85000, semester: 6, section: "A", dept: "AIDS", phone: "+91 98765 43217", email: "deepika.n@dmi.edu", dob: "2003-04-02", parent: "Mrs. Nair Lakshmi", address: "67, Nungambakkam, Chennai" },
  Student009: { name: "Suresh Babu", cgpa: 8.1, credits: 137, attendance: 87, pendingFees: 18000, totalFees: 85000, paid: 67000, semester: 6, section: "B", dept: "CIVIL", phone: "+91 98765 43218", email: "suresh.b@dmi.edu", dob: "2003-12-19", parent: "Mr. Babu Shankar", address: "89, Sholinganallur, Chennai" },
  Student010: { name: "Meena Lakshmi", cgpa: 8.6, credits: 141, attendance: 91, pendingFees: 8000, totalFees: 85000, paid: 77000, semester: 6, section: "A", dept: "CSE", phone: "+91 98765 43219", email: "meena.l@dmi.edu", dob: "2003-06-07", parent: "Mr. Lakshmi Narayanan", address: "11, Mylapore, Chennai" },
};

export const FACULTY_USERS: Record<string, { name: string; dept: string; exp: string; designation: string; students: number; subjects: number; mentees: number; assignments: number; publications: number; phone: string; email: string; qualification: string; specialization: string }> = {
  Faculty001: { name: "Dr. Rajesh Kumar", dept: "CSE", exp: "8 Years", designation: "Assistant Professor", students: 120, subjects: 3, mentees: 20, assignments: 15, publications: 8, phone: "+91 98765 11001", email: "rajesh.kumar@dmi.edu", qualification: "Ph.D. Computer Science", specialization: "Machine Learning & AI" },
  Faculty002: { name: "Dr. Priya Sharma", dept: "IT", exp: "12 Years", designation: "Associate Professor", students: 100, subjects: 2, mentees: 25, assignments: 12, publications: 15, phone: "+91 98765 11002", email: "priya.sharma@dmi.edu", qualification: "Ph.D. Information Technology", specialization: "Cloud Computing" },
  Faculty003: { name: "Dr. Arjun Patel", dept: "ECE", exp: "6 Years", designation: "Assistant Professor", students: 80, subjects: 3, mentees: 18, assignments: 10, publications: 5, phone: "+91 98765 11003", email: "arjun.patel@dmi.edu", qualification: "Ph.D. Electronics", specialization: "VLSI Design" },
  Faculty004: { name: "Dr. Kavitha Rajan", dept: "EEE", exp: "10 Years", designation: "Associate Professor", students: 90, subjects: 2, mentees: 22, assignments: 14, publications: 12, phone: "+91 98765 11004", email: "kavitha.rajan@dmi.edu", qualification: "Ph.D. Electrical Engineering", specialization: "Power Systems" },
  Faculty005: { name: "Dr. Suresh Babu", dept: "MECH", exp: "15 Years", designation: "Professor", students: 110, subjects: 3, mentees: 30, assignments: 18, publications: 20, phone: "+91 98765 11005", email: "suresh.babu@dmi.edu", qualification: "Ph.D. Mechanical Engineering", specialization: "Thermal Engineering" },
};

export const FACULTY_SUBJECTS: Record<string, Array<{ code: string; name: string; semester: number; students: number; schedule: string; room: string }>> = {
  Faculty001: [
    { code: "CS6301", name: "Data Structures", semester: 6, students: 40, schedule: "Mon/Wed/Fri 9:00-10:00 AM", room: "CSE Lab 1" },
    { code: "CS6302", name: "Computer Networks", semester: 6, students: 40, schedule: "Tue/Thu 10:00-11:30 AM", room: "Room 301" },
    { code: "CS6303", name: "Database Systems", semester: 6, students: 40, schedule: "Mon/Wed 2:00-3:30 PM", room: "Room 302" },
  ],
  Faculty002: [
    { code: "IT6201", name: "Cloud Computing", semester: 5, students: 35, schedule: "Mon/Wed/Fri 10:00-11:00 AM", room: "IT Lab 2" },
    { code: "IT6202", name: "Web Technologies", semester: 5, students: 35, schedule: "Tue/Thu 2:00-3:30 PM", room: "Room 204" },
  ],
  Faculty003: [
    { code: "EC6301", name: "Digital Signal Processing", semester: 5, students: 30, schedule: "Mon/Wed 9:00-10:30 AM", room: "ECE Lab 1" },
    { code: "EC6302", name: "Communication Systems", semester: 6, students: 30, schedule: "Tue/Thu/Sat 10:00-11:00 AM", room: "Room 401" },
    { code: "EC6303", name: "Microprocessors", semester: 5, students: 30, schedule: "Fri 2:00-5:00 PM", room: "ECE Lab 2" },
  ],
  Faculty004: [
    { code: "EE6301", name: "Power Systems Analysis", semester: 6, students: 25, schedule: "Mon/Wed 10:00-11:30 AM", room: "EEE Lab 1" },
    { code: "EE6302", name: "Control Systems", semester: 5, students: 25, schedule: "Tue/Thu 9:00-10:30 AM", room: "Room 501" },
  ],
  Faculty005: [
    { code: "ME6301", name: "Thermal Engineering", semester: 5, students: 40, schedule: "Mon/Wed/Fri 11:00 AM-12:00 PM", room: "MECH Lab 1" },
    { code: "ME6302", name: "Fluid Mechanics", semester: 6, students: 40, schedule: "Tue/Thu 10:00-11:30 AM", room: "Room 601" },
    { code: "ME6303", name: "Manufacturing Technology", semester: 6, students: 40, schedule: "Sat 9:00 AM-12:00 PM", room: "Workshop" },
  ],
};

export const FACULTY_MENTEES: Record<string, Array<{ id: string; name: string; cgpa: number; attendance: number; status: string }>> = {
  Faculty001: [
    { id: "Student001", name: "Rajesh Kumar", cgpa: 8.7, attendance: 92, status: "Good" },
    { id: "Student002", name: "Priya Sharma", cgpa: 9.1, attendance: 95, status: "Excellent" },
    { id: "Student003", name: "Arjun Patel", cgpa: 8.3, attendance: 88, status: "Good" },
    { id: "Student010", name: "Meena Lakshmi", cgpa: 8.6, attendance: 91, status: "Good" },
  ],
  Faculty002: [
    { id: "Student004", name: "Sneha Reddy", cgpa: 8.9, attendance: 94, status: "Excellent" },
  ],
  Faculty003: [
    { id: "Student005", name: "Vikram Singh", cgpa: 8.5, attendance: 90, status: "Good" },
  ],
  Faculty004: [
    { id: "Student006", name: "Anitha Kumari", cgpa: 8.8, attendance: 93, status: "Excellent" },
  ],
  Faculty005: [
    { id: "Student007", name: "Karthik Rajan", cgpa: 7.9, attendance: 85, status: "At Risk" },
  ],
};

export const FACULTY_ASSIGNMENTS: Record<string, Array<{ title: string; subject: string; dueDate: string; submitted: number; total: number; status: string }>> = {
  Faculty001: [
    { title: "Binary Tree Implementation", subject: "Data Structures", dueDate: "March 20, 2024", submitted: 35, total: 40, status: "Active" },
    { title: "TCP/IP Protocol Analysis", subject: "Computer Networks", dueDate: "March 22, 2024", submitted: 28, total: 40, status: "Active" },
    { title: "ER Diagram Design", subject: "Database Systems", dueDate: "March 15, 2024", submitted: 40, total: 40, status: "Graded" },
    { title: "Sorting Algorithm Comparison", subject: "Data Structures", dueDate: "March 10, 2024", submitted: 38, total: 40, status: "Graded" },
    { title: "Network Topology Report", subject: "Computer Networks", dueDate: "March 8, 2024", submitted: 37, total: 40, status: "Graded" },
    { title: "SQL Query Optimization", subject: "Database Systems", dueDate: "March 25, 2024", submitted: 12, total: 40, status: "Active" },
  ],
  Faculty002: [
    { title: "AWS Deployment Report", subject: "Cloud Computing", dueDate: "March 18, 2024", submitted: 30, total: 35, status: "Active" },
    { title: "React SPA Project", subject: "Web Technologies", dueDate: "March 22, 2024", submitted: 20, total: 35, status: "Active" },
    { title: "Docker Container Lab", subject: "Cloud Computing", dueDate: "March 12, 2024", submitted: 35, total: 35, status: "Graded" },
  ],
  Faculty003: [
    { title: "DSP Filter Design", subject: "Digital Signal Processing", dueDate: "March 20, 2024", submitted: 25, total: 30, status: "Active" },
    { title: "AM/FM Modulation Lab", subject: "Communication Systems", dueDate: "March 15, 2024", submitted: 30, total: 30, status: "Graded" },
  ],
  Faculty004: [
    { title: "Load Flow Analysis", subject: "Power Systems Analysis", dueDate: "March 22, 2024", submitted: 18, total: 25, status: "Active" },
    { title: "PID Controller Design", subject: "Control Systems", dueDate: "March 18, 2024", submitted: 22, total: 25, status: "Active" },
  ],
  Faculty005: [
    { title: "Heat Exchanger Design", subject: "Thermal Engineering", dueDate: "March 25, 2024", submitted: 30, total: 40, status: "Active" },
    { title: "Pipe Flow Calculation", subject: "Fluid Mechanics", dueDate: "March 20, 2024", submitted: 35, total: 40, status: "Active" },
    { title: "CNC Programming Lab", subject: "Manufacturing Technology", dueDate: "March 15, 2024", submitted: 40, total: 40, status: "Graded" },
  ],
};

export const FACULTY_PUBLICATIONS: Record<string, Array<{ title: string; type: string; journal: string; year: number; citations: number }>> = {
  Faculty001: [
    { title: "Deep Learning Approaches for NLP", type: "Journal", journal: "IEEE Transactions on AI", year: 2023, citations: 45 },
    { title: "Machine Learning in Education", type: "Conference", journal: "ICML 2023", year: 2023, citations: 22 },
    { title: "Neural Network Optimization Techniques", type: "Journal", journal: "ACM Computing Surveys", year: 2022, citations: 67 },
    { title: "AI-Driven Curriculum Design", type: "Book Chapter", journal: "Springer AI in Education", year: 2022, citations: 15 },
  ],
  Faculty002: [
    { title: "Serverless Architecture Patterns", type: "Journal", journal: "Cloud Computing Journal", year: 2023, citations: 33 },
    { title: "Multi-Cloud Deployment Strategies", type: "Conference", journal: "IEEE CloudCom 2023", year: 2023, citations: 18 },
  ],
  Faculty003: [
    { title: "VLSI Design for 5G", type: "Journal", journal: "IEEE Circuits", year: 2023, citations: 12 },
  ],
  Faculty004: [
    { title: "Smart Grid Optimization", type: "Journal", journal: "IEEE Power Systems", year: 2023, citations: 28 },
    { title: "Renewable Energy Integration", type: "Conference", journal: "ICCEP 2022", year: 2022, citations: 35 },
  ],
  Faculty005: [
    { title: "Advanced Thermal Management", type: "Journal", journal: "Heat Transfer Engineering", year: 2023, citations: 40 },
    { title: "CFD Analysis of Turbine Blades", type: "Conference", journal: "ASME Turbo Expo 2022", year: 2022, citations: 25 },
    { title: "Manufacturing Process Optimization", type: "Book", journal: "CRC Press", year: 2021, citations: 55 },
  ],
};

export const ATTENDANCE_DATA = [
  { date: "March 18, 2024", subject: "Data Structures", period: "9:00-10:00 AM", present: 38, total: 40, percentage: 95 },
  { date: "March 18, 2024", subject: "Computer Networks", period: "10:00-11:30 AM", present: 36, total: 40, percentage: 90 },
  { date: "March 17, 2024", subject: "Database Systems", period: "2:00-3:30 PM", present: 37, total: 40, percentage: 92.5 },
  { date: "March 17, 2024", subject: "Data Structures", period: "9:00-10:00 AM", present: 39, total: 40, percentage: 97.5 },
  { date: "March 16, 2024", subject: "Computer Networks", period: "10:00-11:30 AM", present: 35, total: 40, percentage: 87.5 },
];

export const CLUBS = [
  { name: "Literary Club", icon: "📚", members: 180, dept: "All Departments", desc: "Fostering creativity through writing, poetry, and literature", coordinator: "Dr. Priya Sharma", events: ["Essay Competition", "Debate Championship", "Poetry Slam"], nextEvent: "Inter-college Debate - March 25", budget: "₹50,000" },
  { name: "Cultural Club", icon: "🎭", members: 220, dept: "All Departments", desc: "Celebrating arts, music, dance, and cultural diversity", coordinator: "Prof. Anand Kumar", events: ["Annual Day", "Cultural Fest", "Music Night"], nextEvent: "Cultural Fest - April 5", budget: "₹1,20,000" },
  { name: "Sports Club", icon: "⚽", members: 300, dept: "All Departments", desc: "Promoting physical fitness and sportsmanship", coordinator: "Mr. Vijay Kumar", events: ["Sports Day", "Cricket Tournament", "Basketball League"], nextEvent: "Inter-dept Cricket - March 28", budget: "₹80,000" },
  { name: "Photography Club", icon: "📸", members: 120, dept: "All Departments", desc: "Capturing moments and developing visual storytelling skills", coordinator: "Prof. Meena Devi", events: ["Photo Walk", "Exhibition", "Workshop"], nextEvent: "Photo Exhibition - April 2", budget: "₹30,000" },
  { name: "Environmental Club", icon: "🌱", members: 150, dept: "All Departments", desc: "Creating awareness about environmental conservation", coordinator: "Dr. Ramesh Babu", events: ["Tree Planting", "Clean Campus Drive", "Awareness Rally"], nextEvent: "Earth Day Event - April 22", budget: "₹25,000" },
  { name: "Tech Innovators", icon: "💻", members: 85, dept: "CSE", desc: "Advancing technology through coding, AI, and innovation", coordinator: "Dr. Rajesh Kumar", events: ["Hackathon", "Code Challenge", "Tech Talk"], nextEvent: "Hackathon 2024 - April 10", budget: "₹60,000" },
  { name: "Data Science Club", icon: "📊", members: 65, dept: "AIDS", desc: "Exploring data analytics and machine learning", coordinator: "Prof. Sanjay Gupta", events: ["Data Viz Contest", "ML Workshop", "Kaggle Challenge"], nextEvent: "ML Workshop - March 30", budget: "₹40,000" },
  { name: "Robotics Club", icon: "🤖", members: 70, dept: "MECH", desc: "Building robots and mechanical innovations", coordinator: "Dr. Suresh Babu", events: ["Robo Wars", "Line Follower Contest", "Drone Workshop"], nextEvent: "Robo Wars - April 15", budget: "₹75,000" },
  { name: "Electronics Club", icon: "⚡", members: 60, dept: "ECE", desc: "Exploring electronics, circuits, and communication systems", coordinator: "Dr. Arjun Patel", events: ["Circuit Design", "IoT Workshop", "PCB Design"], nextEvent: "IoT Workshop - March 29", budget: "₹35,000" },
  { name: "Power Systems Club", icon: "🔌", members: 55, dept: "EEE", desc: "Focusing on electrical systems and renewable energy", coordinator: "Dr. Kavitha Rajan", events: ["Solar Panel Workshop", "Smart Grid Seminar", "Industrial Visit"], nextEvent: "Solar Workshop - April 8", budget: "₹45,000" },
];

export const PARTNERS = [
  { name: "Cape Start", color: "bg-blue-600", accent: "text-blue-600", date: "March 15, 2024", desc: "Industry collaboration for skill development and placement" },
  { name: "Infosys", color: "bg-green-600", accent: "text-green-600", date: "February 28, 2024", desc: "Technology partnership and campus recruitment program" },
  { name: "ZOHO", color: "bg-purple-600", accent: "text-purple-600", date: "January 20, 2024", desc: "Research collaboration and internship programs" },
  { name: "Avalon", color: "bg-orange-600", accent: "text-orange-600", date: "December 10, 2023", desc: "Engineering projects and industrial training partnership" },
  { name: "Ofs", color: "bg-red-600", accent: "text-red-600", date: "November 25, 2023", desc: "Automotive technology and innovation partnership" },
  { name: "Tech Mahindra", color: "bg-teal-600", accent: "text-teal-600", date: "October 15, 2023", desc: "Industrial automation and digitalization programs" },
];

export const NOTIFICATIONS = [
  { title: "Examination Controller", message: "Internal Exam 2 schedule has been updated. Please check your timetable.", color: "yellow", time: "2 hours ago" },
  { title: "Academic Office", message: "Semester 6 hall tickets are now available for download.", color: "blue", time: "1 day ago" },
  { title: "Library Department", message: "New reference books for Database Systems have been added to the digital library.", color: "green", time: "3 days ago" },
  { title: "Sports Department", message: "Inter-department cricket tournament registrations are open. Last date: March 25.", color: "purple", time: "4 days ago" },
  { title: "Placement Cell", message: "Infosys campus drive scheduled for April 5. Register on the placement portal.", color: "orange", time: "5 days ago" },
];

export const ADMIN_STUDENT_LIST = [
  { id: "STU001", name: "Rajesh Kumar", dept: "CSE", sem: 6, cgpa: 8.7, attendance: 92, feeStatus: "Partial", status: "Active" },
  { id: "STU002", name: "Priya Sharma", dept: "CSE", sem: 6, cgpa: 9.1, attendance: 95, feeStatus: "Partial", status: "Active" },
  { id: "STU003", name: "Arjun Patel", dept: "CSE", sem: 6, cgpa: 8.3, attendance: 88, feeStatus: "Pending", status: "Active" },
  { id: "STU004", name: "Sneha Reddy", dept: "IT", sem: 6, cgpa: 8.9, attendance: 94, feeStatus: "Partial", status: "Active" },
  { id: "STU005", name: "Vikram Singh", dept: "ECE", sem: 6, cgpa: 8.5, attendance: 90, feeStatus: "Partial", status: "Active" },
  { id: "STU006", name: "Anitha Kumari", dept: "EEE", sem: 6, cgpa: 8.8, attendance: 93, feeStatus: "Partial", status: "Active" },
  { id: "STU007", name: "Karthik Rajan", dept: "MECH", sem: 6, cgpa: 7.9, attendance: 85, feeStatus: "Pending", status: "At Risk" },
  { id: "STU008", name: "Deepika Nair", dept: "AIDS", sem: 6, cgpa: 9.3, attendance: 97, feeStatus: "Paid", status: "Active" },
  { id: "STU009", name: "Suresh Babu", dept: "CIVIL", sem: 6, cgpa: 8.1, attendance: 87, feeStatus: "Pending", status: "Active" },
  { id: "STU010", name: "Meena Lakshmi", dept: "CSE", sem: 6, cgpa: 8.6, attendance: 91, feeStatus: "Partial", status: "Active" },
  { id: "STU011", name: "Rohit Gupta", dept: "CSE", sem: 4, cgpa: 7.5, attendance: 78, feeStatus: "Pending", status: "At Risk" },
  { id: "STU012", name: "Aishwarya Balan", dept: "IT", sem: 4, cgpa: 8.4, attendance: 91, feeStatus: "Paid", status: "Active" },
  { id: "STU013", name: "Mohammed Faisal", dept: "ECE", sem: 2, cgpa: 8.0, attendance: 89, feeStatus: "Paid", status: "Active" },
  { id: "STU014", name: "Lakshmi Priya", dept: "EEE", sem: 2, cgpa: 8.8, attendance: 93, feeStatus: "Paid", status: "Active" },
  { id: "STU015", name: "Ganesh Moorthy", dept: "MECH", sem: 4, cgpa: 7.2, attendance: 74, feeStatus: "Pending", status: "At Risk" },
];

export const ADMIN_FACULTY_LIST = [
  { id: "FAC001", name: "Dr. Rajesh Kumar", dept: "CSE", designation: "Assistant Professor", exp: "8 Years", students: 120, rating: 4.7, status: "Active" },
  { id: "FAC002", name: "Dr. Priya Sharma", dept: "IT", designation: "Associate Professor", exp: "12 Years", students: 100, rating: 4.8, status: "Active" },
  { id: "FAC003", name: "Dr. Arjun Patel", dept: "ECE", designation: "Assistant Professor", exp: "6 Years", students: 80, rating: 4.5, status: "Active" },
  { id: "FAC004", name: "Dr. Kavitha Rajan", dept: "EEE", designation: "Associate Professor", exp: "10 Years", students: 90, rating: 4.6, status: "Active" },
  { id: "FAC005", name: "Dr. Suresh Babu", dept: "MECH", designation: "Professor", exp: "15 Years", students: 110, rating: 4.9, status: "Active" },
  { id: "FAC006", name: "Dr. Meena Devi", dept: "CSE", designation: "Assistant Professor", exp: "5 Years", students: 60, rating: 4.4, status: "Active" },
  { id: "FAC007", name: "Prof. Anand Kumar", dept: "CSE", designation: "Professor", exp: "18 Years", students: 130, rating: 4.8, status: "Active" },
  { id: "FAC008", name: "Dr. Sanjay Gupta", dept: "AIDS", designation: "Assistant Professor", exp: "7 Years", students: 75, rating: 4.5, status: "Active" },
  { id: "FAC009", name: "Dr. Ramesh Babu", dept: "CIVIL", designation: "Associate Professor", exp: "11 Years", students: 45, rating: 4.6, status: "On Leave" },
  { id: "FAC010", name: "Prof. Vijay Kumar", dept: "MECH", designation: "Assistant Professor", exp: "9 Years", students: 95, rating: 4.3, status: "Active" },
];

export const PLACEMENT_DATA = {
  companies: [
    { name: "Infosys", package: "₹6.5 LPA", students: 45, date: "April 5, 2024", status: "Upcoming" },
    { name: "ZOHO", package: "₹8.0 LPA", students: 30, date: "April 12, 2024", status: "Upcoming" },
    { name: "TCS", package: "₹7.0 LPA", students: 60, date: "March 10, 2024", status: "Completed" },
    { name: "Wipro", package: "₹5.5 LPA", students: 35, date: "March 5, 2024", status: "Completed" },
    { name: "Cape Start", package: "₹5.0 LPA", students: 20, date: "February 20, 2024", status: "Completed" },
    { name: "Tech Mahindra", package: "₹6.0 LPA", students: 25, date: "April 20, 2024", status: "Upcoming" },
  ],
  stats: { placementRate: "93.2%", avgPackage: "₹8.5 LPA", highestPackage: "₹24 LPA", companiesVisited: 42, offersReceived: 876 },
};

export const INFRASTRUCTURE_DATA = {
  classrooms: { total: 85, functional: 83, maintenance: 2, smart: 40 },
  labs: { total: 45, functional: 43, maintenance: 2, types: ["Computer Lab (12)", "Electronics Lab (8)", "Mechanical Workshop (6)", "Chemistry Lab (4)", "Physics Lab (4)", "Language Lab (2)", "Research Lab (9)"] },
  hostel: { blocks: 4, totalRooms: 320, occupancy: "94%", boysBlocks: 2, girlsBlocks: 2 },
  library: { books: "50,000+", journals: 200, eBooks: "10,000+", seats: 500, operatingHours: "8:00 AM - 10:00 PM" },
  sports: { grounds: 3, courts: 5, gym: 1, facilities: ["Cricket Ground", "Football Field", "Basketball Court", "Tennis Court", "Volleyball Court", "Gymnasium", "Athletic Track"] },
};

export const FINANCIAL_DATA = {
  totalCollection: "₹2.8 Cr",
  pending: "₹32 L",
  monthlyExpenses: "₹18 L",
  breakdown: [
    { category: "Tuition Fees", collected: "₹1.8 Cr", pending: "₹12 L" },
    { category: "Hostel Fees", collected: "₹45 L", pending: "₹8 L" },
    { category: "Lab Fees", collected: "₹30 L", pending: "₹5 L" },
    { category: "Transport Fees", collected: "₹15 L", pending: "₹4 L" },
    { category: "Library Fees", collected: "₹10 L", pending: "₹3 L" },
  ],
  expenses: [
    { category: "Faculty Salaries", amount: "₹8 L" },
    { category: "Infrastructure Maintenance", amount: "₹3 L" },
    { category: "Lab Equipment", amount: "₹2.5 L" },
    { category: "Library Resources", amount: "₹1.5 L" },
    { category: "Utilities", amount: "₹2 L" },
    { category: "Administrative", amount: "₹1 L" },
  ],
};

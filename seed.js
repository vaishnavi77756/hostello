const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hostel = require('./models/Hostel');
const Admin = require('./models/Admin');
dotenv.config();

const hostels = [
// ── MUMBAI (10) ──
{ name:"Sunshine Hostel", city:"mumbai", price:4500, address:"123 Marine Drive, Churchgate, Mumbai", amenities:["WiFi","AC","Laundry","Kitchen","Security"], description:"Comfortable hostel steps from Marine Drive with sea breeze.", available:true, rating:4.5 },
{ name:"Bandra Student House", city:"mumbai", price:6500, address:"12 Hill Road, Bandra West, Mumbai", amenities:["WiFi","AC","Mess","Study Room","Security","Rooftop"], description:"Premium hostel in Bandra with rooftop lounge.", available:true, rating:4.7 },
{ name:"City Center Hostel", city:"mumbai", price:5500, address:"567 Andheri West, Mumbai", amenities:["WiFi","AC","Gym","Laundry","Security","Parking"], description:"Centrally located in Andheri with metro access.", available:true, rating:4.4 },
{ name:"Dadar Budget Stay", city:"mumbai", price:3800, address:"45 Dadar East, Mumbai", amenities:["WiFi","Kitchen","Security","Laundry"], description:"Affordable hostel near Dadar railway station.", available:true, rating:4.0 },
{ name:"Powai Lake View PG", city:"mumbai", price:7000, address:"IIT Area, Powai, Mumbai", amenities:["WiFi","AC","Gym","Cafeteria","Security","Parking"], description:"Scenic hostel near IIT Bombay with lake views.", available:true, rating:4.8 },
{ name:"Colaba Backpackers", city:"mumbai", price:3500, address:"Near Gateway of India, Colaba, Mumbai", amenities:["WiFi","Common Room","Security","Laundry"], description:"Budget stay in the heart of South Mumbai.", available:true, rating:4.1 },
{ name:"Kurla Student Inn", city:"mumbai", price:4200, address:"LBS Road, Kurla West, Mumbai", amenities:["WiFi","Mess","Security","AC","Laundry"], description:"Well-connected hostel near Kurla station.", available:true, rating:4.2 },
{ name:"Thane Green Residency", city:"mumbai", price:4800, address:"Ghodbunder Road, Thane, Mumbai", amenities:["WiFi","AC","Garden","Security","Study Room"], description:"Peaceful hostel with garden in Thane.", available:true, rating:4.3 },
{ name:"Borivali North PG", city:"mumbai", price:4000, address:"Borivali East, Mumbai", amenities:["WiFi","Kitchen","Security","Common Room"], description:"Quiet hostel near Sanjay Gandhi National Park.", available:true, rating:4.0 },
{ name:"Malad Student Hub", city:"mumbai", price:5200, address:"Malad West, Mumbai", amenities:["WiFi","AC","Gym","Security","Laundry"], description:"Modern hostel near Infiniti Mall and metro.", available:true, rating:4.4 },
// ── DELHI (10) ──
{ name:"Student Haven Delhi", city:"delhi", price:5000, address:"456 Connaught Place, New Delhi", amenities:["WiFi","Gym","Mess","Study Room","Security","AC"], description:"Perfect for students near Connaught Place.", available:true, rating:4.3 },
{ name:"South Delhi Residency", city:"delhi", price:7000, address:"22 Hauz Khas Village, South Delhi", amenities:["WiFi","AC","Gym","Cafeteria","Security","Study Room"], description:"Premium hostel in upscale Hauz Khas.", available:true, rating:4.8 },
{ name:"Karol Bagh Hostel", city:"delhi", price:4200, address:"78 Karol Bagh, New Delhi", amenities:["WiFi","AC","Kitchen","Security","Laundry"], description:"Budget-friendly hostel in Karol Bagh market area.", available:true, rating:4.1 },
{ name:"Lajpat Nagar PG", city:"delhi", price:4800, address:"33 Lajpat Nagar II, New Delhi", amenities:["WiFi","Mess","Security","AC","Laundry"], description:"Well-connected hostel near Lajpat Nagar metro.", available:true, rating:4.2 },
{ name:"Dwarka Student Home", city:"delhi", price:4500, address:"Sector 10, Dwarka, New Delhi", amenities:["WiFi","AC","Mess","Security","Study Room"], description:"Spacious hostel in the planned Dwarka suburb.", available:true, rating:4.3 },
{ name:"Rohini Budget PG", city:"delhi", price:3800, address:"Sector 7, Rohini, New Delhi", amenities:["WiFi","Kitchen","Security","Laundry"], description:"Affordable stay in North Delhi's Rohini.", available:true, rating:4.0 },
{ name:"Janakpuri Residency", city:"delhi", price:5200, address:"Block C, Janakpuri, New Delhi", amenities:["WiFi","AC","Gym","Security","Parking"], description:"Modern hostel near Janakpuri metro station.", available:true, rating:4.4 },
{ name:"Saket Scholar Inn", city:"delhi", price:6000, address:"Near Select Citywalk, Saket, New Delhi", amenities:["WiFi","AC","Cafeteria","Security","Study Room","Gym"], description:"Premium hostel near Saket metro and malls.", available:true, rating:4.6 },
{ name:"Pitampura Student Stay", city:"delhi", price:4000, address:"Pitampura, North Delhi", amenities:["WiFi","Mess","Security","Common Room"], description:"Cozy hostel in the residential Pitampura area.", available:true, rating:4.1 },
{ name:"Noida Extension PG", city:"delhi", price:4600, address:"Sector 62, Noida, Delhi NCR", amenities:["WiFi","AC","Gym","Security","Laundry"], description:"Modern hostel in Noida's IT sector.", available:true, rating:4.3 },
// ── BANGALORE (10) ──
{ name:"Tech Hub Hostel", city:"bangalore", price:6000, address:"789 MG Road, Bangalore", amenities:["WiFi","AC","Parking","Cafeteria","24/7 Security","Gym"], description:"Modern hostel in the heart of tech city.", available:true, rating:4.7 },
{ name:"Indiranagar Student Hub", city:"bangalore", price:7500, address:"14 100 Feet Road, Indiranagar, Bangalore", amenities:["WiFi","AC","Gym","Rooftop","Security","Cafeteria"], description:"Trendy hostel in vibrant Indiranagar.", available:true, rating:4.9 },
{ name:"Campus Hostel Koramangala", city:"bangalore", price:5200, address:"890 Koramangala 5th Block, Bangalore", amenities:["WiFi","Mess","Study Room","Recreation","Security","AC"], description:"Close to major colleges and tech parks.", available:true, rating:4.6 },
{ name:"Whitefield Budget Inn", city:"bangalore", price:4500, address:"56 Whitefield Main Road, Bangalore", amenities:["WiFi","Kitchen","Security","Laundry","AC"], description:"Affordable stay near Whitefield IT corridor.", available:true, rating:4.0 },
{ name:"HSR Layout PG", city:"bangalore", price:6500, address:"HSR Layout Sector 2, Bangalore", amenities:["WiFi","AC","Gym","Security","Study Room","Parking"], description:"Popular hostel in the startup hub of HSR Layout.", available:true, rating:4.7 },
{ name:"Marathahalli Tech Stay", city:"bangalore", price:5500, address:"Marathahalli Bridge, Bangalore", amenities:["WiFi","AC","Cafeteria","Security","Laundry"], description:"Convenient hostel near Outer Ring Road IT parks.", available:true, rating:4.4 },
{ name:"Jayanagar Scholar Home", city:"bangalore", price:4800, address:"4th Block, Jayanagar, Bangalore", amenities:["WiFi","Mess","Study Room","Security","Garden"], description:"Peaceful hostel in the leafy Jayanagar area.", available:true, rating:4.3 },
{ name:"Electronic City Hostel", city:"bangalore", price:4200, address:"Phase 1, Electronic City, Bangalore", amenities:["WiFi","AC","Security","Laundry","Kitchen"], description:"Budget hostel near Infosys and Wipro campuses.", available:true, rating:4.1 },
{ name:"Malleshwaram Student Inn", city:"bangalore", price:5000, address:"15th Cross, Malleshwaram, Bangalore", amenities:["WiFi","Mess","AC","Security","Common Room"], description:"Traditional neighbourhood hostel in Malleshwaram.", available:true, rating:4.2 },
{ name:"Bellandur Lake View", city:"bangalore", price:6800, address:"Bellandur, Outer Ring Road, Bangalore", amenities:["WiFi","AC","Gym","Pool","Security","Cafeteria"], description:"Premium hostel with lake views near Ecospace.", available:true, rating:4.8 },
// ── PUNE (10) ──
{ name:"Green Valley Hostel", city:"pune", price:4000, address:"321 FC Road, Shivajinagar, Pune", amenities:["WiFi","Garden","Kitchen","Common Room","Security"], description:"Peaceful hostel near Fergusson College.", available:true, rating:4.2 },
{ name:"Kothrud Student Home", city:"pune", price:4800, address:"67 Kothrud, Pune", amenities:["WiFi","AC","Mess","Study Room","Security","Laundry"], description:"Popular among engineering students in Kothrud.", available:true, rating:4.4 },
{ name:"Viman Nagar Residency", city:"pune", price:6200, address:"89 Viman Nagar, Pune", amenities:["WiFi","AC","Gym","Cafeteria","Security","Parking"], description:"Modern hostel near Pune airport and IT parks.", available:true, rating:4.6 },
{ name:"Hinjewadi IT Hostel", city:"pune", price:5500, address:"Phase 1, Hinjewadi, Pune", amenities:["WiFi","AC","Cafeteria","Security","Gym","Parking"], description:"Ideal for IT professionals in Hinjewadi tech park.", available:true, rating:4.5 },
{ name:"Deccan Gymkhana PG", city:"pune", price:5000, address:"Deccan Gymkhana, Pune", amenities:["WiFi","AC","Mess","Security","Study Room"], description:"Central location near Pune University.", available:true, rating:4.3 },
{ name:"Baner Budget Stay", city:"pune", price:4500, address:"Baner Road, Pune", amenities:["WiFi","Kitchen","Security","Laundry","AC"], description:"Affordable hostel in the growing Baner suburb.", available:true, rating:4.1 },
{ name:"Wakad Scholar Inn", city:"pune", price:4800, address:"Wakad, Pimpri-Chinchwad, Pune", amenities:["WiFi","AC","Mess","Security","Study Room"], description:"Quiet hostel near Wakad IT companies.", available:true, rating:4.2 },
{ name:"Aundh Premium PG", city:"pune", price:6500, address:"Aundh Road, Pune", amenities:["WiFi","AC","Gym","Rooftop","Security","Cafeteria"], description:"Upscale hostel in the posh Aundh locality.", available:true, rating:4.7 },
{ name:"Hadapsar Tech Hostel", city:"pune", price:4200, address:"Hadapsar, Pune", amenities:["WiFi","AC","Security","Laundry","Kitchen"], description:"Budget hostel near Magarpatta City IT park.", available:true, rating:4.0 },
{ name:"Pimpri Student Hub", city:"pune", price:3800, address:"Pimpri, Pune", amenities:["WiFi","Mess","Security","Common Room"], description:"Affordable hostel near PCMC industrial area.", available:true, rating:4.0 },
// ── HYDERABAD (10) ──
{ name:"Hitech City Hostel", city:"hyderabad", price:5500, address:"12 Madhapur, Hitech City, Hyderabad", amenities:["WiFi","AC","Gym","Cafeteria","Security","Parking"], description:"Premium hostel in the IT hub of Hyderabad.", available:true, rating:4.6 },
{ name:"Banjara Hills Luxury PG", city:"hyderabad", price:8000, address:"Road No. 12, Banjara Hills, Hyderabad", amenities:["WiFi","AC","Gym","Pool","Security","Cafeteria"], description:"Luxury hostel in posh Banjara Hills.", available:true, rating:4.8 },
{ name:"Ameerpet Student Stay", city:"hyderabad", price:4000, address:"45 Ameerpet, Hyderabad", amenities:["WiFi","Mess","Study Room","Security","AC"], description:"Ideal for coaching institute students in Ameerpet.", available:true, rating:4.2 },
{ name:"Gachibowli Scholar Inn", city:"hyderabad", price:6000, address:"Gachibowli, Hyderabad", amenities:["WiFi","AC","Gym","Cafeteria","Security","Study Room"], description:"Modern hostel near DLF and Microsoft campuses.", available:true, rating:4.6 },
{ name:"Kondapur Budget PG", city:"hyderabad", price:4500, address:"Kondapur Main Road, Hyderabad", amenities:["WiFi","AC","Kitchen","Security","Laundry"], description:"Affordable hostel near Kondapur IT corridor.", available:true, rating:4.1 },
{ name:"Kukatpally Student Home", city:"hyderabad", price:4200, address:"KPHB Colony, Kukatpally, Hyderabad", amenities:["WiFi","Mess","Security","Common Room","AC"], description:"Budget hostel near JNTU Hyderabad.", available:true, rating:4.0 },
{ name:"Jubilee Hills Premium", city:"hyderabad", price:7500, address:"Road No. 36, Jubilee Hills, Hyderabad", amenities:["WiFi","AC","Gym","Rooftop","Security","Cafeteria"], description:"Upscale hostel in the elite Jubilee Hills area.", available:true, rating:4.7 },
{ name:"Secunderabad Railway PG", city:"hyderabad", price:3800, address:"Near Secunderabad Station, Hyderabad", amenities:["WiFi","Kitchen","Security","Laundry"], description:"Budget hostel near Secunderabad railway junction.", available:true, rating:4.0 },
{ name:"Miyapur Metro Hostel", city:"hyderabad", price:4600, address:"Miyapur, Hyderabad", amenities:["WiFi","AC","Mess","Security","Study Room"], description:"Convenient hostel near Miyapur metro terminus.", available:true, rating:4.2 },
{ name:"LB Nagar Student Inn", city:"hyderabad", price:4000, address:"LB Nagar, Hyderabad", amenities:["WiFi","Mess","Security","Common Room","Laundry"], description:"Affordable hostel in South Hyderabad.", available:true, rating:4.1 },
// ── CHENNAI (10) ──
{ name:"Anna Nagar Student Home", city:"chennai", price:4500, address:"23 Anna Nagar West, Chennai", amenities:["WiFi","AC","Mess","Security","Laundry"], description:"Well-maintained hostel in residential Anna Nagar.", available:true, rating:4.3 },
{ name:"OMR Tech Hostel", city:"chennai", price:5800, address:"90 Old Mahabalipuram Road, Chennai", amenities:["WiFi","AC","Gym","Cafeteria","Security","Parking"], description:"Modern hostel along the IT corridor of OMR.", available:true, rating:4.5 },
{ name:"T Nagar Budget Hostel", city:"chennai", price:3500, address:"56 T Nagar, Chennai", amenities:["WiFi","Kitchen","Security","Laundry"], description:"Affordable hostel near T Nagar shopping district.", available:true, rating:4.0 },
{ name:"Velachery IT Stay", city:"chennai", price:5200, address:"Velachery Main Road, Chennai", amenities:["WiFi","AC","Gym","Security","Study Room"], description:"Convenient hostel near Phoenix MarketCity.", available:true, rating:4.4 },
{ name:"Adyar Scholar Inn", city:"chennai", price:5500, address:"Adyar, Chennai", amenities:["WiFi","AC","Mess","Security","Study Room","Garden"], description:"Peaceful hostel near IIT Madras in Adyar.", available:true, rating:4.5 },
{ name:"Tambaram Student PG", city:"chennai", price:3800, address:"Tambaram, Chennai", amenities:["WiFi","Mess","Security","Common Room","Laundry"], description:"Budget hostel near Tambaram railway station.", available:true, rating:4.0 },
{ name:"Porur Tech Residency", city:"chennai", price:4800, address:"Porur, Chennai", amenities:["WiFi","AC","Cafeteria","Security","Parking"], description:"Modern hostel near DLF IT Park Porur.", available:true, rating:4.2 },
{ name:"Guindy Premium PG", city:"chennai", price:6000, address:"Guindy, Chennai", amenities:["WiFi","AC","Gym","Security","Study Room","Cafeteria"], description:"Upscale hostel near Anna University and TIDEL Park.", available:true, rating:4.6 },
{ name:"Sholinganallur Budget Inn", city:"chennai", price:4200, address:"Sholinganallur, Chennai", amenities:["WiFi","AC","Kitchen","Security","Laundry"], description:"Affordable hostel in the OMR tech belt.", available:true, rating:4.1 },
{ name:"Perambur Student Hub", city:"chennai", price:3600, address:"Perambur, North Chennai", amenities:["WiFi","Mess","Security","Common Room"], description:"Budget hostel in North Chennai near ICF.", available:true, rating:4.0 },
// ── KOLKATA (10) ──
{ name:"Park Street Hostel", city:"kolkata", price:3800, address:"34 Park Street, Kolkata", amenities:["WiFi","Mess","Security","Common Room","Laundry"], description:"Classic hostel on the iconic Park Street.", available:true, rating:4.1 },
{ name:"Salt Lake Student Hub", city:"kolkata", price:4500, address:"Sector V, Salt Lake, Kolkata", amenities:["WiFi","AC","Study Room","Security","Cafeteria"], description:"Modern hostel in the IT hub of Salt Lake.", available:true, rating:4.4 },
{ name:"Jadavpur Scholar Inn", city:"kolkata", price:4000, address:"Near Jadavpur University, Kolkata", amenities:["WiFi","Mess","Study Room","Security","Common Room"], description:"Popular hostel among Jadavpur University students.", available:true, rating:4.3 },
{ name:"New Town IT Residency", city:"kolkata", price:5500, address:"Action Area 1, New Town, Kolkata", amenities:["WiFi","AC","Gym","Cafeteria","Security","Parking"], description:"Modern hostel in the planned New Town township.", available:true, rating:4.5 },
{ name:"Howrah Budget Stay", city:"kolkata", price:3200, address:"Near Howrah Station, Kolkata", amenities:["WiFi","Kitchen","Security","Laundry"], description:"Affordable hostel near Howrah railway junction.", available:true, rating:3.9 },
{ name:"Ballygunge Premium PG", city:"kolkata", price:5800, address:"Ballygunge, South Kolkata", amenities:["WiFi","AC","Mess","Security","Study Room","Garden"], description:"Upscale hostel in the posh Ballygunge area.", available:true, rating:4.6 },
{ name:"Dum Dum Student Home", city:"kolkata", price:3800, address:"Dum Dum, North Kolkata", amenities:["WiFi","Mess","Security","Common Room"], description:"Budget hostel near Netaji Subhas Chandra Bose Airport.", available:true, rating:4.0 },
{ name:"Tollygunge Scholar PG", city:"kolkata", price:4200, address:"Tollygunge, South Kolkata", amenities:["WiFi","AC","Mess","Security","Laundry"], description:"Comfortable hostel near Tollygunge metro.", available:true, rating:4.2 },
{ name:"Behala Budget Inn", city:"kolkata", price:3500, address:"Behala, Kolkata", amenities:["WiFi","Kitchen","Security","Common Room"], description:"Affordable hostel in the Behala residential area.", available:true, rating:3.9 },
{ name:"Rajarhat Tech Hostel", city:"kolkata", price:5000, address:"Rajarhat, Kolkata", amenities:["WiFi","AC","Gym","Security","Cafeteria"], description:"Modern hostel near Wipro and TCS campuses in Rajarhat.", available:true, rating:4.3 },
// ── JAIPUR (10) ──
{ name:"Pink City Hostel", city:"jaipur", price:3500, address:"12 MI Road, Jaipur", amenities:["WiFi","AC","Kitchen","Security","Rooftop"], description:"Charming hostel with rooftop views of the Pink City.", available:true, rating:4.3 },
{ name:"Malviya Nagar PG", city:"jaipur", price:4200, address:"45 Malviya Nagar, Jaipur", amenities:["WiFi","Mess","AC","Security","Laundry"], description:"Popular among students near Malviya NIT.", available:true, rating:4.2 },
{ name:"Vaishali Nagar Student Inn", city:"jaipur", price:4500, address:"Vaishali Nagar, Jaipur", amenities:["WiFi","AC","Mess","Security","Study Room"], description:"Modern hostel in the upscale Vaishali Nagar area.", available:true, rating:4.4 },
{ name:"Mansarovar Budget Stay", city:"jaipur", price:3800, address:"Mansarovar, Jaipur", amenities:["WiFi","Kitchen","Security","Common Room","Laundry"], description:"Affordable hostel in the large Mansarovar township.", available:true, rating:4.0 },
{ name:"C-Scheme Premium PG", city:"jaipur", price:6000, address:"C-Scheme, Jaipur", amenities:["WiFi","AC","Gym","Security","Cafeteria","Parking"], description:"Upscale hostel in the commercial C-Scheme area.", available:true, rating:4.6 },
{ name:"Jagatpura Tech Hostel", city:"jaipur", price:4000, address:"Jagatpura, Jaipur", amenities:["WiFi","AC","Security","Laundry","Mess"], description:"Convenient hostel near Jaipur IT Park.", available:true, rating:4.1 },
{ name:"Tonk Road Scholar Home", city:"jaipur", price:4200, address:"Tonk Road, Jaipur", amenities:["WiFi","Mess","AC","Security","Study Room"], description:"Quiet hostel along the busy Tonk Road.", available:true, rating:4.2 },
{ name:"Sitapura Industrial PG", city:"jaipur", price:3600, address:"Sitapura Industrial Area, Jaipur", amenities:["WiFi","Kitchen","Security","Laundry"], description:"Budget hostel near Sitapura IT and industrial zone.", available:true, rating:3.9 },
{ name:"Bani Park Heritage Stay", city:"jaipur", price:5500, address:"Bani Park, Jaipur", amenities:["WiFi","AC","Rooftop","Security","Common Room","Garden"], description:"Heritage-style hostel in the quiet Bani Park locality.", available:true, rating:4.5 },
{ name:"Sanganer Student Hub", city:"jaipur", price:3800, address:"Sanganer, Jaipur", amenities:["WiFi","Mess","Security","Common Room"], description:"Affordable hostel near Jaipur International Airport.", available:true, rating:4.0 },
// ── AHMEDABAD (10) ──
{ name:"SG Highway Hostel", city:"ahmedabad", price:4800, address:"23 SG Highway, Ahmedabad", amenities:["WiFi","AC","Gym","Security","Cafeteria"], description:"Modern hostel along the busy SG Highway.", available:true, rating:4.4 },
{ name:"Navrangpura Student Stay", city:"ahmedabad", price:3800, address:"56 Navrangpura, Ahmedabad", amenities:["WiFi","Mess","Security","Study Room","AC"], description:"Affordable hostel near Gujarat University.", available:true, rating:4.1 },
{ name:"Prahlad Nagar IT PG", city:"ahmedabad", price:5500, address:"Prahlad Nagar, Ahmedabad", amenities:["WiFi","AC","Gym","Cafeteria","Security","Parking"], description:"Premium hostel in the corporate Prahlad Nagar area.", available:true, rating:4.5 },
{ name:"Satellite Scholar Inn", city:"ahmedabad", price:5000, address:"Satellite Road, Ahmedabad", amenities:["WiFi","AC","Mess","Security","Study Room"], description:"Well-located hostel in the Satellite residential area.", available:true, rating:4.3 },
{ name:"Maninagar Budget Stay", city:"ahmedabad", price:3500, address:"Maninagar, Ahmedabad", amenities:["WiFi","Kitchen","Security","Laundry"], description:"Affordable hostel near Maninagar railway station.", available:true, rating:4.0 },
{ name:"Bopal Premium Residency", city:"ahmedabad", price:6000, address:"Bopal, Ahmedabad", amenities:["WiFi","AC","Gym","Pool","Security","Cafeteria"], description:"Luxury hostel in the growing Bopal suburb.", available:true, rating:4.7 },
{ name:"Vastrapur Lake View", city:"ahmedabad", price:5200, address:"Vastrapur, Ahmedabad", amenities:["WiFi","AC","Rooftop","Security","Study Room"], description:"Scenic hostel near Vastrapur Lake and IIM Ahmedabad.", available:true, rating:4.5 },
{ name:"Chandkheda Student Home", city:"ahmedabad", price:4000, address:"Chandkheda, Ahmedabad", amenities:["WiFi","Mess","Security","Common Room","AC"], description:"Budget hostel near PDPU and Nirma University.", available:true, rating:4.1 },
{ name:"Gota Budget Inn", city:"ahmedabad", price:3800, address:"Gota, Ahmedabad", amenities:["WiFi","Kitchen","Security","Laundry"], description:"Affordable hostel in the North Ahmedabad suburb.", available:true, rating:3.9 },
{ name:"Thaltej Tech Hostel", city:"ahmedabad", price:5500, address:"Thaltej, Ahmedabad", amenities:["WiFi","AC","Gym","Security","Cafeteria","Parking"], description:"Modern hostel near GIFT City and tech companies.", available:true, rating:4.4 },
// ── SURAT (10) ──
{ name:"Diamond City Hostel", city:"surat", price:3500, address:"34 Adajan, Surat", amenities:["WiFi","AC","Kitchen","Security","Laundry"], description:"Clean and affordable hostel in the diamond city.", available:true, rating:4.0 },
{ name:"Vesu Student Home", city:"surat", price:4200, address:"78 Vesu, Surat", amenities:["WiFi","Mess","AC","Security","Study Room"], description:"Comfortable hostel near SVNIT and colleges.", available:true, rating:4.3 },
{ name:"Athwa Lines Premium PG", city:"surat", price:5500, address:"Athwa Lines, Surat", amenities:["WiFi","AC","Gym","Security","Cafeteria"], description:"Upscale hostel in the commercial Athwa Lines area.", available:true, rating:4.5 },
{ name:"Piplod Scholar Inn", city:"surat", price:4800, address:"Piplod, Surat", amenities:["WiFi","AC","Mess","Security","Study Room"], description:"Modern hostel in the upscale Piplod locality.", available:true, rating:4.4 },
{ name:"Katargam Budget Stay", city:"surat", price:3200, address:"Katargam, Surat", amenities:["WiFi","Kitchen","Security","Laundry"], description:"Affordable hostel in the textile hub of Katargam.", available:true, rating:3.9 },
{ name:"Pal Gam Student Hub", city:"surat", price:4000, address:"Pal Gam, Surat", amenities:["WiFi","Mess","AC","Security","Common Room"], description:"Quiet hostel in the residential Pal Gam area.", available:true, rating:4.1 },
{ name:"Althan Tech Residency", city:"surat", price:5000, address:"Althan, Surat", amenities:["WiFi","AC","Gym","Security","Cafeteria","Parking"], description:"Modern hostel near SVNIT and Althan IT companies.", available:true, rating:4.3 },
{ name:"Udhna Industrial PG", city:"surat", price:3400, address:"Udhna, Surat", amenities:["WiFi","Kitchen","Security","Laundry"], description:"Budget hostel near Udhna industrial area.", available:true, rating:3.8 },
{ name:"Citylight Premium Stay", city:"surat", price:6000, address:"Citylight Road, Surat", amenities:["WiFi","AC","Gym","Rooftop","Security","Cafeteria"], description:"Luxury hostel with rooftop in the posh Citylight area.", available:true, rating:4.7 },
{ name:"Bhatar Student Inn", city:"surat", price:4200, address:"Bhatar Road, Surat", amenities:["WiFi","Mess","AC","Security","Study Room"], description:"Comfortable hostel near Bhatar colleges.", available:true, rating:4.2 },
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
        await Hostel.deleteMany({});
        await Admin.deleteMany({});
        await Hostel.insertMany(hostels);
        console.log(`✅ ${hostels.length} hostels seeded across 10 cities (10 per city)`);
        const admin = new Admin({ username:'admin', password:'admin123', email:'admin@hostello.com' });
        await admin.save();
        console.log('✅ Admin created — username: admin, password: admin123');
        console.log('🎉 Database seeded successfully!');
        process.exit(0);
    } catch(error) {
        console.error('Error seeding database:', error.message);
        process.exit(1);
    }
}

seedDatabase();

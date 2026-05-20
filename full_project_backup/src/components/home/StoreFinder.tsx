"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Navigation2, Clock, ExternalLink } from "lucide-react";

const MUMBAI_AREAS_TEXT = "Aagman Abhyudaya Nagar Aghadi Nagar Agrawal Nagar Agripada Air India Staff Colony 1 Aksa Gaon Akurli Nagar Ambedkar Nagar Ambekar Nagar Ambewadi Ambivali Ambojwadi Amboli Amrut Nagar Anand Nagar Andheri East Andheri West Anita Nagar Antop Hill Anushakti Nagar Apollo Bandar Appa Pada Army Area Army Area Asalpha Asha Nagar Ashok Nagar Ashok Van Ashtavinayak Nagar Avdhut Nagar Azad Nagar Azmi Nagar Babasaheb Ambedkar Nagar Babhai Naka Babrekar Nagar Badhwar Park Ballard Estate Bamanwada Bandongri Bandra East Bandra Kurla Complex Bandra West Bangur Nagar Goregaon West Bangur Nagar Barve Nagar BDD Chawl Behram Baug Best Nagar Bhagat Singh Nagar 1 Bhagat Singh Nagar Bhakti Park Bhandup East Bhandup West Bharatiya Kamala Nagar Bhatwadi Bhavani Nagar Bhoiwada Bhuleshwar Bima Nagar Bimbisar Nagar Bori Colony Borivali East Borivali Borivali West Borla Brahmanwadi Breach Candy BSNL Colony Byculla Cama Industrial Estate CCI Colony Century Bazaar Chakala Chandan Nagar Chandivali Chandrabai Nagar Chandrakant Dhuru Wadi Charkop Gaon Charkop Charni Road East Chembur Gaothan Chembur Chikuwadi Chincholi Bunder Chinchpokli Chirag Nagar Chunabhatti Churchgate Churi Wadi Coal Bunder Colaba Cotton Green Cuffe Parade Cumballa Hill D.N.Nagar Dadar East Dadar Dadar Dahanukar Wadi Dahisar East Dahisar Dahisar West Dalal Estate Damoji Patil Wadi Danda Village Darukhana Daulat Nagar Deonar Devala Pada Devipada Dharamveer Nagar Dharavi Dharkhadi Diamond Industrial Estate Dindoshi Dominic Colony Dongri Dosti Acres Dr Babasaheb Ambedkar Nagar Eksar Ekta Nagar Everard Nagar Evershine Nagar Fort Four Bungalows Friends Colony Gaikwad Nagar Ganesh Murti Nagar Ganesh Nagar Ganpat Patil Nagar Garodia Nagar Geeta Nagar Geeta Nagar Ghatkopar East Ghatkopar West Ghodapdeo Girgaon Gokul Nagar Gokuldham Colony Golibar Gorai Goraswadi Goregaon East Goregaon Goregaon West Govandi East Govind Dalvi Nagar Gowalia Tank Grant Road Gundavali Gundecha Garden Haji Ali Hanuman Nagar Hanuman Tekdi Hari Om Nagar Hariyali Hasmukh Nagar I C Colony Indira Docks Indira Docks Ins Hamla Irani Wadi Irla J B Nagar Jacob Circle Jagdusha Nagar Jai Bhim Nagar Janata Colony Janata Nagar Jankalyan Nagar Jarimari Jawahar Nagar JB Nagar Jethava Nagar Jogeshwari East Jogeshwari West Joshi Vadi Juhu Koliwada Juhu Kajupada Kala Ghoda Kala Nagar Kalachowki Kalbadevi Kalina Kamala Nagar Kamathipura Kamgaar Nagar Kanchpada Kandarpada Kandivali East Kandivali Kandivali West Kanjur Village Kanjurmarg East Kanjurmarg Kanjurmarg West Kanti Nagar Kanyapada Kasaiwada Kasaravadi Kemps Corner Ketkipada Khandiwadi Khar Danda Khar East Khar Khar West Kharodi Kharodi Village Kherwadi Khindipada Kokan Nagar Koldongri Kolekalyan Police Colony Koliwada Kondivita Kopri Kranti Nagar Krishna Colony Krishna Nagar Kumud Nagar Kunchi Kurve Nagar Kurla Kurla West Kushal Nagar Lal Baug Laxmi Udyog Nagar Liberty Garden Lokhandwala Complex Lokhandwala Twp Lourdes Colony Lower Govind Nagar Lower Parel Madh Mahajan Wadi Mahavir Nagar Mahesh Nagar Mahim Malabar Hill Malad East Malad Malad West Malcolm Baug Malvani Mandala Mandapeshwar Maneklal Estate Mankhurd Mankur Marine Lines Marol Marve Masjid Bandar Matunga Matunga West Mazgaon Mazgoan Mhada Colony Mhatre Wadi MHB Colony Milind Nagar MINT Colony Mitha Nagar Mohili Momin Nagar Mora Gaon Morarji Nagar Motilal nagar Mount Mary Mulund East Mulund Mulund West Mumbai Central Mumbai Port Trust Mumbai Tarun Bharat Mustafa Bazar Nahur East Nahur Nahur West Naidu Colony Naigaon Naik Nagar Nair Wadi Nana Chowk Nane Pada Naralwadi Narayan Nagar Nariman Point Natwar Nagar Navshanti Nagar Navy Nagar Neelkanth Kingdom Nehru Nagar New Airport Colony New Navy Nagar New Navy Nagar Nityanand Nagar Nl Complex NNP Colony Nofra Orlem Oshiwara P and T Colony Padmaba Nagar Pailipada Pali Hill Pant Nagar Parel Parshiwada Parshiwada Patthar Nagar Peddar Road Pereira Wadi Peru Baug Pimpripada Piramal Nagar Pirojshanagar Poisar Poonam Nagar Postal Colony Potohar Nagar Powai Prabhadevi Prabhat Colony Pratikhsha Nagar Prem Nagar Premier Residencies Raheja Vihar Raj Bhavan Rajawadi Colony Rajiv Gandhi Nagar Ram Krishna Nagar Ramgad Nagar Ranwar Rathodi Rawalpada Reclamation Rizvi Complex Safed Pul Safed Pul Sahakar Nagar Saki Naka Sambhaji Nagar Samna Nagar Sane Guruji Nagar Sangam Nagar SANTACRUZ EAST Santacruz West Sarvodaya Nagar Satya Nagar Sevak Nagar Sewri Shankarwadi Shastri Nagar Sher E Punjab Colony Shimpoli Shirley Shivaji Nagar Shivaji Park Siddharth Nagar Sindhu Nagar Sindi Colony Sion East Sion Koliwada Sion Sion West Somaiya Sonawala Industry Estate Students Residential Zone Suman Nagar Sunder Nagar SV Patel Nagar Swami Samarth Nagar Tabela Tadwadi Tagore Nagar Takshila Colony Tanji Nagar Tardeo Tarun Bharat Tata Colony Tata Nagar Teen Batti Tejas Nagar Colony Tembhipada Thakkar Bappa Colony Thakur Complex Tilak Nagar Triveni Nagar Trombay Indusrial Area Tulshet Pada Tunga Village Union Park Unnat Nagar Upper Govind Nagar Usha Nagar Vahatuk Nagar Valmiki Nagar Valnai Vasant Vihar Versova Vidyavihar Vidyavihar West Vikhroli East Vikhroli Vikhroli West Vile Parle East Vile Parle Vile Parle West Vithaldas Nagar Wadala East Wadala Wadala Truck Terminal Store Wadala West Waghdevi Nagar Worli Worli Naka Worli Shivaji Nagar Yashodham Yashwant Nagar Yogi Nagar";

// Rough parser to group words into locations
const parseAreas = (text: string) => {
  const words = text.split(" ");
  const markers = ["Nagar", "Colony", "West", "East", "Hill", "Park", "Bunder", "Wadi", "Baug", "Estate", "Complex", "Road", "Gaon", "Pada", "Naka", "Area", "Docks", "Point", "Village", "Residencies", "Bhavan", "Terminal", "Nagar", "Lines", "Circle"];
  let results = [];
  let current = [];
  
  for (let i = 0; i < words.length; i++) {
    current.push(words[i]);
    // Group words if they end with a known marker, or if the next word is capitalized (start of new area)
    if (markers.includes(words[i]) || i === words.length - 1 || (words[i+1] && /^[A-Z][a-z]+$/.test(words[i+1]) && !markers.includes(words[i+1]) && current.length >= 2)) {
      if (current.length > 0) {
        results.push(current.join(" "));
        current = [];
      }
    }
  }
  // Deduplicate and sort
  return [...new Set(results)].sort();
};

export const ALL_AREAS = parseAreas(MUMBAI_AREAS_TEXT);

export default function StoreFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState(ALL_AREAS[0]);

  const filteredAreas = useMemo(() => {
    if (!searchQuery.trim()) return ALL_AREAS.slice(0, 50); // Show first 50 when empty to avoid lag
    const query = searchQuery.toLowerCase();
    return ALL_AREAS.filter(area => area.toLowerCase().includes(query));
  }, [searchQuery]);

  const mapUrl = `https://www.google.com/maps?q=Tumbledry+${encodeURIComponent(selectedArea)},+Mumbai,+Maharashtra&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=Tumbledry+${encodeURIComponent(selectedArea)},+Mumbai,+Maharashtra`;

  return (
    <section id="locations" className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Always Near You in Mumbai.</h2>
          <p className="text-lg text-text-light">
            With stores across {ALL_AREAS.length}+ locations in Mumbai, professional laundry is never more than 15 minutes away.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-3 h-[600px] lg:h-[500px]">
            
            {/* Search Panel */}
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col h-full bg-white">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm font-medium" 
                  placeholder="Search your area in Mumbai..."
                />
              </div>

              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-3">
                {filteredAreas.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-8">No locations found matching "{searchQuery}"</p>
                ) : (
                  filteredAreas.map((area, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedArea(area)}
                      className={`p-4 rounded-xl border ${selectedArea === area ? 'border-primary bg-blue-50/30' : 'border-gray-100 hover:border-gray-300'} transition-colors cursor-pointer`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-text text-sm">Tumbledry {area}</h4>
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase">Open</span>
                      </div>
                      <p className="text-xs text-text-light flex items-start gap-1">
                        <MapPin size={14} className="shrink-0 text-gray-400" />
                        {area}, Mumbai
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Map Area */}
            <div className="lg:col-span-2 relative h-full bg-gray-200">
              <iframe 
                src={mapUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
              
              {/* Overlay UI */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                <div className="bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 pointer-events-auto">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Selected Store</p>
                    <p className="text-sm font-bold text-text">{selectedArea}</p>
                  </div>
                </div>

                <a 
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-4 py-2.5 rounded-xl shadow-lg font-bold text-sm flex items-center gap-2 hover:bg-primary-dark transition-colors pointer-events-auto"
                >
                  <Navigation2 size={16} /> Get Directions <ExternalLink size={14} className="ml-1 opacity-70"/>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

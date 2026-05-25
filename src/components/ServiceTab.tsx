import { useState } from "react";

import service102 from "../assets/services/service102.jpg";
import service103 from "../assets/services/service103.jpg";
import service104 from "../assets/services/service104.jpg";
import service201 from "../assets/services/service201.png";
import service202 from "../assets/services/service202.png";
import service301 from "../assets/services/service301.png";
import service302 from "../assets/services/service302.png";
import service304 from "../assets/services/service304.png";
import service401 from "../assets/services/service401.png";
import service402 from "../assets/services/service402.png";
import service403 from "../assets/services/service403.png";
import service404 from "../assets/services/service404.jpg";
import service405 from "../assets/services/service405.jpg";
import service503 from "../assets/services/service503.png";
import service602 from "../assets/services/service602.png";
import service603 from "../assets/services/service603.png";
import service604 from "../assets/services/service604.png";
import service605 from "../assets/services/service605.png";


interface ServiceItem {
  image: string;
  title: string;
  description: string;
}

interface TabItem {
  key: string;
  title: string;
  services: ServiceItem[];
}

const tabList: TabItem[] = [
  {
    key: "preventive",
    title: "Preventive Dentistry",
    services: [
      {
        image: service102,
        title: "Panoramic Dental X-rays",
        description:
          "Utilizing panoramic radiography technology, it comprehensively displays the upper and lower jaws, the dentition, and surrounding anatomical structures in a single exposure, serving to diagnose impacted teeth, supernumerary teeth, jawbone lesions, and similar conditions."
      },
      {
        image: service103,
        title: "Initial Consultation and Examination for Dental Implants",
        description:
          "It encompasses oral CBCT scanning, alveolar bone volume assessment, occlusal analysis, and systemic health screening, providing a foundation for the safe placement and long-term stability of dental implants."
      },
      {
        image: service104,
        title: "Initial Orthodontic Examination",
        description:
          "Through lateral cephalometric radiographs, dental model analysis, and facial profile assessment, the type of malocclusion is diagnosed, and a personalized orthodontic treatment plan is formulated."
      }
    ]
  },

  {
    key: "pediatric",
    title: "Pediatric Dentistry",
    services: [
      {
        image: service201,
        title: "Pit and Fissure Sealants",
        description:
          "Pit and fissure sealing is a preventive dental procedure that involves applying a sealant material to the pits, fissures, and grooves on the occlusal, buccal, and lingual surfaces of the tooth crown—without causing any damage to the tooth structure itself. This creates a protective barrier that covers the grooves, thereby preventing cariogenic bacteria and their acidic metabolic byproducts from eroding the tooth structure, with the ultimate goal of preventing pit and fissure caries."
      },
      {
        image: service202,
        title: "Full-Mouth Fluoride Application",
        description:
          "Fluoride application is an effective method for preventing dental caries. It involves applying a layer of fluoride to the teeth, thereby forming a protective film on the tooth surface that enhances mineralization and hardness, while boosting the teeth's resistance to decay and their capacity for remineralization."
      }
    ]
  },

  {
    key: "implant",
    title: "Implant Dentistry",
    services: [
      {
        image: service301,
        title: "Implant Restoration",
        description:
          "Dental implants are a restorative method involving the surgical placement of pure titanium implants into the alveolar bone of the edentulous area, followed by the attachment of a customized dental crown once osseointegration has occurred. This procedure is suitable for patients missing a single tooth, multiple teeth, or an entire set of teeth, and offers advantages such as causing no damage to adjacent teeth, providing stable retention, and delivering a natural, aesthetic appearance."
      },
      {
        image: service302,
        title: "Immediate Implant Placement",
        description:
          "Immediate implant placement is a technique involving the immediate insertion of a dental implant into the extraction site following the removal of a diseased tooth."
      },
      {
        image: service304,
        title: "Bone Grafting",
        description:
          "Dental implant bone grafting is a technique designed for patients with insufficient alveolar bone volume; it involves the implantation of autogenous bone or artificial bone granules to reconstruct the alveolar bone structure, thereby providing stable support for dental implants. This procedure is indicated for cases of bone loss resulting from long-term tooth loss, periodontal disease, or trauma."
      }
    ]
  },

  {
    key: "comprehensive",
    title: "Comprehensive Treatment",
    services: [
      {
        image: service401,
        title: "Ultrasonic Dental Cleaning",
        description:
          "Ultrasonic instruments are used to remove supragingival calculus, plaque, and minor surface stains, thereby improving oral hygiene and preventing periodontal disease. It is recommended to undergo a professional dental cleaning every six to twelve months."
      },
      {
        image: service402,
        title: "Dental Filling",
        description:
          "Composite resins or glass ionomer materials are utilized to restore tooth structure defects—such as those caused by dental caries, wedge-shaped defects, or trauma—thereby restoring the tooth's morphology and function. When the lesion has extended to the dental pulp, or has even resulted in periapical disease, root canal therapy must be performed prior to filling the tooth."
      },
      {
        image: service403,
        title: "Root Canal Treatment",
        description:
          "Root canal treatment is a common method for treating pulpitis and periapical diseases. It involves removing the infected pulp, disinfecting the root canal, and then tightly filling it to preserve the affected tooth and eliminate periapical inflammation. For severe cases, multiple follow-up visits may be required."
      },
      {
        image: service404,
        title: "Wisdom Tooth Extraction",
        description:
          "Extraction of impacted wisdom teeth, those subject to recurrent inflammation, or those affecting adjacent teeth (preoperative X-rays are required for assessment)."
      },
      {
        image: service405,
        title: "Periodontal Treatment",
        description:
          "Periodontal treatment encompasses subgingival scaling, root planing, and pharmacotherapy to control the progression of periodontitis; severe cases require flap surgery or guided tissue regeneration."
      }
    ]
  },

  {
    key: "orthodontics",
    title: "Orthodontics",
    services: [
      {
        image: service503,
        title: "Invisible Orthodontics",
        description:
          "Invisible orthodontics is an orthodontic treatment plan that utilizes 3D digital technology to custom-fabricate transparent aligners, precisely shifting teeth through the application of biomechanical principles."
      }
    ]
  },

  {
    key: "aesthetic",
    title: "Aesthetic Dentistry",
    services: [
      {
        image: service602,
        title: "Dental Veneers",
        description:
          "Dental veneers are an aesthetic restorative technique involving the bonding of ultra-thin porcelain or resin restorations to the labial surface of teeth—either after removing a minimal amount of enamel or without any enamel reduction at all. This procedure effectively addresses discoloration caused by conditions such as fluorosis and tetracycline staining, as well as minor structural defects. It is particularly suitable for patients with otherwise well-aligned teeth who present with color anomalies or small gaps."
      },
      {
        image: service603,
        title: "Crown Restoration",
        description:
          "Crown restoration is a restorative procedure involving the placement of a custom-fabricated artificial crown over a compromised tooth to restore its morphology, function, and aesthetics. It requires minimal tooth preparation and is indicated for cases involving extensive decay, teeth weakened by root canal treatment, fractured teeth, and severely discolored teeth."
      },
      {
        image: service604,
        title: "Inlay Restoration",
        description:
          "An inlay is a precisely customized restoration designed to restore the morphology and function of a damaged tooth."
      },
      {
        image: service605,
        title: "Removable Denture Restoration",
        description:
          "The professional term for removable dentures is *removable prostheses*; this category encompasses both removable partial dentures and complete dentures."
      }
    ]
  }
];

type ServiceCardProps = ServiceItem;

function ServiceCard({
  image,
  title,
  description
}: ServiceCardProps) {
  return (
    <div className="flex gap-6 items-center border-b py-8 bg-grey-100">
      <img
        src={image}
        alt={title}
        className="w-52 h-36 object-cover border-gray-300 border-1"
      />

      <div>
        <h3 className="text-2xl font-semibold mb-3">
          {title}
        </h3>
        <p className="text-gray-600 leading-7">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<string>(
    tabList[0].key
  );

  const currentTab = tabList.find(
    tab => tab.key === activeTab
  );

  return (
    <div className="w-full max-w-6xl mx-auto">

      {/* Tabs */}
      <div className="flex justify-between border-b py-8">
        {tabList.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-4 text-lg cursor-pointer hover:text-blue-600 hover:border-b-2 ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-black"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="py-10 bg-white">
        {currentTab?.services.map(service => (
          <ServiceCard
            key={service.title}
            {...service}
          />
        ))}
      </div>
    </div>
  );
}
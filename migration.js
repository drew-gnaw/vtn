const resources = [
  // Crisis and Support Services
  {
    name: "Member Assistance Program",
    description: "Health Canada counselling/crisis line for CAF members, staffed by professional psychologists with specific training around suicide and military-related traumas. Available 24/7.",
    link: "https://www.canada.ca/en/health-canada/services/environmental-workplace-health/occupational-health-safety/employee-assistance-services/contact-us.html",
    phone_number: "1-800-268-7708",
    categories: ["Crisis and Support Services"]
  },
  {
    name: "Family Information Line",
    description: "Confidential, bilingual 24/7 phone counselling and resources for CAF members, families, and Veterans.",
    link: "https://www.canada.ca/fr/armee/services/service-soutien.html",
    phone_number: "1-800-866-4546",
    categories: ["Crisis and Support Services", "Family/Spousal Support"]
  },
  {
    name: "Canada Suicide Prevention Service (CSPS)",
    description: "Talk Suicide Canada provides nationwide, 24-hour, bilingual support to anyone who is facing suicide. Text 45645 (available 4pm to midnight ET). For residents of Quebec: 1-866-277-3553.",
    link: "https://talksuicide.ca/",
    phone_number: "988",
    categories: ["Crisis and Support Services"]
  },
  {
    name: "Sexual Misconduct Support and Resource Centre (SMSRC)",
    description: "Provides support services to those directly or indirectly affected by sexual misconduct such as currently serving and former Canadian Armed Forces members, National Defence public service employees, Cadets and Junior Canadian Rangers affected by sexual misconduct and their families, aged 16 and older. Available 24/7.",
    link: "https://www.canada.ca/en/department-national-defence/services/benefits-military/health-support/sexual-misconduct-response.html",
    phone_number: "1-844-750-1648",
    categories: ["Crisis and Support Services"]
  },
  {
    name: "Hope for Wellness Help Line for all Indigenous peoples",
    description: "The Hope for Wellness Help Line offers immediate help to all Indigenous peoples across Canada. Available 24/7.",
    link: "https://www.sac-isc.gc.ca/eng/1576089519527/1576089566478",
    phone_number: "1-855-242-3310",
    categories: ["Crisis and Support Services"]
  },
  {
    name: "Support Our Troops: Emergency Financial Assistance",
    description: "For veterans and their families under financial distress.",
    link: "https://www.supportourtroops.ca/Get-Support/Emergency-financial-assistance",
    categories: ["Crisis and Support Services"]
  },
  {
    name: "Veterans Affairs Canada: Financial Crisis or Emergency",
    description: "Helping veterans who are facing a financial crisis or emergency. TDD/TTY 1-833-921-0071 (Monday to Friday, 8:30 to 4:30, local time).",
    link: "https://www.veterans.gc.ca/eng/financial-support/emergency-funds",
    phone_number: "1-866-522-2122",
    categories: ["Crisis and Support Services"]
  },
  {
    name: "Vets Emergency Transition Services (VETS Canada)",
    description: "VETS Canada is committed to helping homeless and at-risk veterans reintegrate into civilian life.",
    link: "http://vetscanada.org",
    phone_number: "1-888-228-3871",
    categories: ["Crisis and Support Services", "Veteran Homelessness Support"]
  },
  {
    name: "Legacy Place Society",
    description: "Assisting with nightly stays of Military and First Responders at 3 confidential crisis houses in Alberta during times of medical, marriage or safe respite for individuals or families in crisis.",
    link: "http://legacyplacesociety.com/",
    categories: ["Crisis and Support Services"]
  },
  {
    name: "We-R-911",
    description: "A weekly Zoom-based support group for veterans and first responders living with PTSD and related operational stress injuries. The group offers a safe, understanding space to connect with peers, explore practical tools and resources, and build a supportive community. Sessions are facilitated by a trained paraprofessional.",
    categories: ["Crisis and Support Services", "Support Groups"]
  },

  // Employment
  {
    name: "Legion Military Skills Conversion Program",
    description: "Designed to help accelerate and advance the civilian careers of former and current Reserve Force and Regular Force Canadian military members.",
    link: "https://www.bcit.ca/experience-based-placement/legion-military-skills-conversion-program/",
    categories: ["Employment"]
  },
  {
    name: "Prince's Operation Entrepreneur (POE)",
    description: "POE offers training, financing and mentoring needed to start and sustain a successful business for CF members and Veterans within 2 years of release.",
    link: "http://www.princesoperationentrepreneur.ca/",
    categories: ["Employment"]
  },
  {
    name: "Helmets to Hardhats",
    description: "Offers apprenticeship opportunities for anyone who has served (or is currently serving and transitioning to a civilian career) in either the Regular or Reserve Force of the Canadian Forces.",
    link: "http://www.helmetstohardhats.ca/en/home.htm",
    categories: ["Employment"]
  },
  {
    name: "Commissionaires Canada",
    description: "The largest private employer of veterans in Canada, offering both employment and training in career growth opportunities.",
    link: "https://www.commissionaires.ca/en/national/careers",
    categories: ["Employment"]
  },
  {
    name: "Global Container Terminals Canada",
    description: "One of the top terminal operators in North America. They recognize military training in lieu of university education and have hired VTN graduates for a variety of trades from technicians to management. Mention the VTN in your application.",
    link: "http://globalterminalscanada.com/careers/",
    categories: ["Employment"]
  },
  {
    name: "Pratt & Whitney Canada (P&WC)",
    description: "A global leader in aerospace engines that values the excellence, dependability, adaptability, integrity and accountability learned in the military. Mention the VTN in your application.",
    link: "https://www.pwc.ca/en",
    categories: ["Employment"]
  },
  {
    name: "Sean Smith – That Social Media Guy",
    description: "Social media coach offering LinkedIn organization and online coaching for veterans establishing themselves in the business world.",
    link: "https://www.facebook.com/ThatSocialMediaGuy/",
    phone_number: "1-250-203-4126",
    categories: ["Employment"]
  },
  {
    name: "GardaWorld",
    description: "A global leader in security and cash services, GardaWorld encourages former and current military men and women to join its team and explore careers in armoured truck transport, aviation security, physical security, management and administration.",
    link: "https://www.garda.com/careers/military-and-veterans",
    categories: ["Employment"]
  },
  {
    name: "Archer Guards",
    description: "A leader in security that proudly welcomes veterans. Offers flexible schedules contributing to safety for all.",
    link: "https://archerguards.com/en/fr-agents/",
    categories: ["Employment"]
  },
  {
    name: "Edge4Vets | Jobs for Veterans",
    description: "Edge4Vets assists Veterans in translating strengths from the military into tools for performance in the civilian workplace.",
    link: "http://edge4vets.org/index.html",
    categories: ["Employment"]
  },
  {
    name: "FORCES@WORK",
    description: "An employment placement service offered through Prospect Human Services. Helps ill and injured Canadian Armed Forces transitioning members, medical releases, reservists, veterans and their immediate family members with pre-employment services, and assists in securing civilian jobs.",
    link: "https://www.prospectnow.ca/forces-at-work-psp/",
    categories: ["Employment"]
  },
  {
    name: "Renovo",
    description: "Offers a FREE multi-week program that allows veterans to learn business fundamentals, pursue career development, and explore entrepreneurship through a 6-week hybrid program including virtual workshops and in-person events.",
    link: "https://vtncanada.org/wp-content/uploads/2025/10/Renovo-Official-Information-Package.pdf",
    categories: ["Employment"]
  },

  // Equine Therapy
  {
    name: "BC Equine Program To Assist Veterans With Occupational Stress Injuries",
    description: "Addresses veteran's social isolation and emotional regulation through working with horses. Programs run in Langley on week-ends and evenings. Contact Dr. Colleen Haney at colleen.haney@ubc.ca or Dr. Marla Buchanan at marla.buchanan@ubc.ca.",
    categories: ["Equine Therapy"]
  },
  {
    name: "Tranquil Acres",
    description: "A therapeutic equestrian centre in the Ottawa region for people with varying social, emotional and mental health needs who want to experience the transformative powers of horses as teachers and healers.",
    link: "https://www.facebook.com/Tranquil.Acres.Inc/",
    categories: ["Equine Therapy"]
  },
  {
    name: "Can Praxis Equine Therapy",
    description: "A therapeutic equestrian program designed for Veterans diagnosed with PTSD/OSI and their spouse/partner/family member.",
    link: "https://canpraxis.com/",
    categories: ["Equine Therapy"]
  },
  {
    name: "Equine Assisted Psychotherapy and Equine Assisted Learning (EAGALA)",
    description: "A nonprofit association for professionals incorporating horses to address mental health and personal development needs. Their program supports the psychological health and family relationships of service members, veterans and their families.",
    link: "http://www.eagala.org/military",
    categories: ["Equine Therapy"]
  },
  {
    name: "Small Blessings Animal Ministry",
    description: "Offers Equine Assisted Learning, Life Coaching, and a quiet place to get away. Veterans can receive two 30-minute visits with their equines to unwind, rest and have fun. Guided by Certified Life Coach and Certified Equine Guided Coach Mari Lalana.",
    link: "https://www.smallblessingsanimalministry.com",
    categories: ["Equine Therapy"]
  },

  // Family/Spousal Support
  {
    name: "COPE – Couples Overcoming PTSD Everyday",
    description: "An innovative program that uses the power of the group to learn how to manage PTSD in the home.",
    link: "https://woundedwarriors.ca/our-programs/couples-overcoming-ptsd-everyday/",
    categories: ["Family/Spousal Support"]
  },
  {
    name: "Veteran Family Program",
    description: "Designed specifically to support the needs of medically released CAF members, medically released Veterans released as of April 1, 2018, and their families.",
    link: "https://cfmws.ca/support-services/releasing/veteran-family-program",
    categories: ["Family/Spousal Support"]
  },
  {
    name: "Strongest Families Institute",
    description: "An award-winning charity providing skill-based educational programs to children, youth, adults and families seeking help to improve mental health and well-being via a unique distance coaching approach over the phone, internet or app.",
    link: "https://strongestfamilies.com/",
    categories: ["Family/Spousal Support"]
  },

  // Health and Symptom Management
  {
    name: "Operational Stress Injury Clinics",
    description: "A directory of OSI clinics providing assessment, treatment, prevention and support to serving CAF members, Veterans and RCMP members and former members.",
    link: "http://www.veterans.gc.ca/eng/services/health/mental-health/understanding-mental-health/clinics",
    categories: ["Health and Symptom Management"]
  },
  {
    name: "CCPA-Certified Counselors",
    description: "Find a counselor in your area with the specialization you want.",
    link: "http://www.ccpa-accp.ca/en/findcounsellor/",
    categories: ["Health and Symptom Management"]
  },
  {
    name: "Veterans Affairs Canada",
    description: "VAC offers coverage for a variety of services ranging from physio to PTSD treatment, including family supports.",
    link: "http://www.veterans.gc.ca/eng/services",
    categories: ["Health and Symptom Management"]
  },
  {
    name: "Legion",
    description: "The Legion's Service Officer Network helps in directing to numerous programs and services available for Veterans and their families. They can provide assistance in submitting claims to Veterans Affairs Canada.",
    link: "https://www.legion.ca/home",
    categories: ["Health and Symptom Management"]
  },
  {
    name: "Canadian Support Workers Association (CANSWA) and Ontario Personal Support Workers Association (OPSWA)",
    description: "Service providers for Veterans Affairs Canada, constituting the Professional Association for Personal Support Workers, Health Care Aids, Personal Care Aids, Personal Care Assistants, Home Support Workers within Canada and Ontario.",
    link: "https://www.canadianswassociation.com/",
    categories: ["Health and Symptom Management"]
  },
  {
    name: "Landing Strong",
    description: "A non-profit organization in Nova Scotia dedicated to promoting resilience and assisting recovery from PTSD and Operational Stress Injuries. Their community consists of military members, veterans, first responders, and those who support them.",
    link: "https://landingstrong.com/",
    categories: ["Health and Symptom Management"]
  },
  {
    name: "OSI-CAN",
    description: "A joint project of the Canadian Mental Health Association (Saskatchewan Division) and the Royal Canadian Legion (Saskatchewan Command), dedicated to helping serving members and Veterans of the CAF, Allied Armed Forces, RCMP and Community First Responders.",
    link: "http://www.osi-can.ca/",
    categories: ["Health and Symptom Management"]
  },
  {
    name: "MissionVAV",
    description: "A web-based health promotion program designed to improve the wellbeing of Canadian veterans and their families, focusing on physical activity, weight loss, stress management, and sleep. Free of charge.",
    link: "https://missionvav.com/",
    categories: ["Health and Symptom Management"]
  },
  {
    name: "Traumatic Stress Recovery Program",
    description: "Residential programs for veterans, first-responders, and military personnel.",
    link: "https://ptsdrecovery.ca/",
    categories: ["Health and Symptom Management"]
  },
  {
    name: "Fleming Fitness",
    description: "In-home and in-clinic Kinesiology/Personal Training specifically for Veterans in Ottawa, Kingston, Hamilton, and London. Direct billing with Blue Cross.",
    link: "http://www.flemingfitness.ca",
    phone_number: "613-882-8434",
    categories: ["Health and Symptom Management", "Physical Wellness"]
  },
  {
    name: "The Davidson Institute – Operational Stress Recovery (OSR) Program",
    description: "A Residential-Out-Patient Educational and Treatment Program delivering evidence-based, specialized treatment for Complex and/or Post-traumatic Stress and other comorbidities located in Vernon, BC.",
    link: "http://www.davidsoninstitute.ca/",
    categories: ["Health and Symptom Management"]
  },
  {
    name: "HavenPoint Health",
    description: "A healthcare clinic providing integrated physical and mental healthcare to Veterans and Non-Veterans across Canada. Services include Completion of Disability Questionnaires, Mental Health Assessments and Treatment, and Disability Tax Claims. Does not charge veterans for VAC Benefit Services.",
    link: "http://www.havenpoint.health",
    phone_number: "902-332-3246",
    categories: ["Health and Symptom Management"]
  },

  // Healing Centres
  {
    name: "Honour House",
    description: "Honour House Society is a refuge for Canadian Forces personnel, emergency services personnel and their families to stay, free of charge, while they are receiving medical care and treatment in the Metro Vancouver area.",
    link: "https://honourhouse.ca/",
    categories: ["Healing Centres"]
  },

  // Physical Wellness
  {
    name: "Outward Bound Veterans",
    description: "Outward Bound Canada's Veterans' Program is designed to help Canadian military veterans face the challenges they often encounter post-deployment, through inspiring journeys of healing and self-discovery in the Canadian wilderness.",
    link: "https://www.outwardbound.ca/",
    phone_number: "1-888-688-9273",
    categories: ["Physical Wellness"]
  },

  // Retreats
  {
    name: "Sheepdog Lodge",
    description: "A rustic log cabin retreat for Combat Veterans and First Responders to reconnect and recuperate.",
    link: "https://paramedicnatsmentalhealthjourney.wordpress.com/2017/08/24/welcome-to-sheepdog-lodge/",
    categories: ["Retreats"]
  },
  {
    name: "The Stable Grounds",
    description: "A London Ontario based therapy centre, providing residential 30, 60 and 89 day programs for Public Safety officers and Veterans.",
    link: "https://www.thestablegrounds.com/",
    categories: ["Retreats"]
  },

  // Resource Directories
  {
    name: "Atlas Institute Resources Hub",
    description: "The Atlas Institute for Veterans and Families Knowledge Hub is a library of summaries, fact sheets, research reports, videos, guides, webpages and more, produced by Atlas and their partners.",
    link: "https://atlasveterans.ca/knowledge-hub/",
    categories: ["Resource Directories"]
  },

  // Service Dogs
  {
    name: "Citadel Canine Society",
    description: "A non-profit Society incorporated in British Columbia that strives to make the lives of veterans and first responders better by reducing occupational stress through delivery of trained service dogs.",
    link: "http://www.citadelcanine.com",
    categories: ["Service Dogs"]
  },
  {
    name: "Courageous Companions",
    description: "A registered charity which provides quality trained certified Service Dogs to Military Veterans and First Responders who suffer with physical and/or psychological operational injuries as a result of their service.",
    link: "http://courageouscompanions.ca/",
    categories: ["Service Dogs"]
  },
  {
    name: "Wounded Warriors Service Dogs",
    description: "Wounded Warriors offer background, advice and guidance in consideration of service dogs.",
    link: "https://woundedwarriors.ca/our-programs/ptsd-service-dogs/",
    categories: ["Service Dogs"]
  },

  // Support Groups
  {
    name: "OSISS (Operational Stress Injury Social Support)",
    description: "Provides a national peer support network for Canadian Armed Forces members, Veterans and their families experiencing an operational stress injury (OSI).",
    link: "https://cfmws.ca/support-services/health-wellness/mental-health/operational-stress-injury-social-support-(osiss)",
    categories: ["Support Groups"]
  },
  {
    name: "Canadian Mental Health Association",
    description: "A national charity that helps maintain and improve mental health for all Canadians.",
    link: "https://cmha.ca/",
    categories: ["Support Groups"]
  },
  {
    name: "CF Morale and Welfare Services Directory",
    description: "Canadian Forces Morale and Welfare Services (CFMWS) is responsible for delivering selected public morale and welfare programs, services, and activities to eligible members and their families.",
    link: "https://www.canada.ca/en/department-national-defence/services/benefits-military/transition/scan/general-scan/cfmws-about-us.html",
    categories: ["Support Groups", "Resource Directories"]
  },
  {
    name: "CAF Transition Group",
    description: "Canadian Armed Forces Transition Group offers services and programs for a smooth transition to post-military life.",
    link: "https://www.canada.ca/en/department-national-defence/corporate/reports-publications/transition-guide/about-the-caf-transition-group.html",
    categories: ["Support Groups"]
  },
  {
    name: "Spartan Wellness",
    description: "A network of veterans, physicians, specialists, and a support team of administrators dedicated to informing you of the options available to you for obtaining care for you and your family.",
    link: "http://spartanwellness.ca/",
    categories: ["Support Groups", "Health and Symptom Management"]
  },
  {
    name: "Canadian Survivors of MST (Facebook Group)",
    description: "Sponsored and supported by the United Federation of Canadian Veterans, this closed Facebook group is for men and women who have survived Military Sexual Trauma, and their families. To join, email itsjust700@gmail.com.",
    categories: ["Support Groups"]
  },
  {
    name: "Women Warriors (Facebook Page)",
    description: "Designed for Female Soldiers and veterans from all countries for support, advice and sharing experiences.",
    link: "https://www.facebook.com/WomenWarriorAssoc",
    categories: ["Support Groups"]
  },
  {
    name: "Canadian Forces Silent Ranks (Facebook Group)",
    description: "A group where spouses, family members & friends of injured CF members can talk about challenges.",
    link: "https://www.facebook.com/groups/115423561941444/",
    categories: ["Support Groups", "Family/Spousal Support"]
  },
  {
    name: "Veterans 3B Support Group (Facebook Group)",
    description: "Created to assist medically releasing and released CF members through the process of release.",
    link: "https://www.facebook.com/groups/432709853584762/",
    categories: ["Support Groups"]
  },

  // Medical Marijuana (under Support Groups on the page)
  {
    name: "Canada House Clinics",
    description: "Founded in 2013 by Canadian Forces veterans. Their clinics help Canadians access medical cannabis to treat their common to complex health conditions.",
    link: "https://chclinics.ca/",
    categories: ["Health and Symptom Management"]
  },
  {
    name: "Medical Marijuana Consulting Clinic",
    description: "From education to medical cannabis authorization to assistance with VAC coverage and special assessments for increased coverage. Works with hundreds of Canadian Veterans and First-Responders.",
    link: "http://www.medmc.ca",
    categories: ["Health and Symptom Management"]
  },

  // Veteran Homelessness Support
  {
    name: "The Royal Canadian Legion's Help for Homeless Veterans",
    description: "The Royal Canadian Legion is committed to helping Veterans and their families in need find homes. National and provincial programs offer financial assistance and support for homeless Veterans and those at-risk of homelessness.",
    link: "https://legion.ca/support-for-veterans/homeless-veterans",
    phone_number: "1-877-534-4666",
    categories: ["Veteran Homelessness Support"]
  },
  {
    name: "BC/Yukon Command of the Royal Canadian Legion Foundation: Veteran Homelessness Program",
    description: "In British Columbia and the Yukon, provides rent supplements, utility payments, rental arrears, rental deposit assistance, and wraparound support referrals to eligible Veterans and their families.",
    link: "https://legionbcyukonfoundation.ca/vhp/",
    categories: ["Veteran Homelessness Support"]
  },
  {
    name: "The Valorie at Veterans' Village by VRS Communities",
    description: "Veteran Supportive Transitional Housing dedicated to supporting Canadian Veterans and former RCMP members as they reintegrate into civilian life. Offers up to 12 months of structured, drug and alcohol-free supportive housing with onsite case managers and allied health professionals.",
    link: "https://www.vrs.org/wp-content/uploads/2024/07/Veteran-Program-Application-fillable-form.pdf",
    phone_number: "604-351-7900",
    categories: ["Veteran Homelessness Support"]
  },
  {
    name: "Veterans Advocacy Program by The Mustard Seed",
    description: "Provides emergency supplies, support to find housing and get settled, assistance with damage deposits and rent, health and recovery services, applications for disability and income supports, and specialized advocacy and peer support services. Available in Calgary and Edmonton.",
    categories: ["Veteran Homelessness Support"]
  },

  // Other
  {
    name: "The Roméo Dallaire Child Soldiers Initiative",
    description: "A global partnership based at Dalhousie University whose mission is to progressively eradicate the use and recruitment of child soldiers.",
    link: "http://www.childsoldiers.org",
    categories: ["Other"]
  },
  {
    name: "Alcoholics Anonymous",
    description: "Membership is open to anyone who wants to do something about his or her drinking problem. It is nonprofessional, self-supporting and available almost everywhere.",
    link: "https://www.aa.org/",
    categories: ["Other"]
  },
  {
    name: "Veterans Food Bank of Alberta",
    description: "Delivers food security and other resources such as laundry facilities, tax clinic, and clothing for Veterans of Alberta.",
    link: "https://veteransfoodbankalberta.ca/",
    categories: ["Other"]
  },
  {
    name: "Canadian Women Transcendental Meditation",
    description: "Find your inner peace and balance with the Transcendental Meditation (TM) program: easy to learn, enjoyable to practice and scientifically verified to reduce stress.",
    link: "https://canadianwomenswellness.ca/veterans-2/",
    categories: ["Other"]
  },
  {
    name: "Valour Place",
    description: "A temporary home away from home for all Canadian Forces members, RCMP, Families of the Fallen, Veterans, and First Responders along with their families who require medical treatment in Edmonton. Accommodations are available at no cost.",
    link: "https://www.valourplace.ca/",
    categories: ["Other"]
  },
  {
    name: "Last Post Fund",
    description: "The Last Post Fund's mission is to ensure that no Veteran is denied a dignified funeral and burial, as well as a military gravestone, due to insufficient funds at the time of death.",
    link: "https://www.lastpostfund.ca",
    categories: ["Other"]
  },

  // Downloads
  {
    name: "Harassment Prevention And Resolution Guidelines",
    description: "Created by the Staff of the Non-Public Funds, Canadian Forces and the Director General Personnel and Family Support Services to provide a harassment free workplace and supportive work environment.",
    link: "https://cfmws.ca/CFMWS/media/images/documents/8.0%20About%20Us/8.4%20Policies%20and%20Publications/8.4.1/8.4.1.2/WPHV-Policy-FINAL-EN-29-Jan.pdf",
    categories: ["Downloads"]
  },

  // Mobile Apps
  {
    name: "PTSD Coach Canada",
    description: "The PTSD Coach Canada app can help you learn about and manage symptoms that can occur after trauma.",
    link: "http://www.veterans.gc.ca/eng/etools/ptsd-coach-canada",
    categories: ["Mobile Apps"]
  },
  {
    name: "OSI Connect",
    description: "A free mental health learning and self-management mobile app developed to help OSI patients and their families understand the nature of operational stress injuries (OSIs) and to provide help through the OSI Clinic Network across Canada.",
    link: "http://www.veterans.gc.ca/eng/mental-health/osi/osi-app",
    categories: ["Mobile Apps"]
  }
];

async function postAll() {
  let success = 0;
  let failed = 0;
  const errors = [];

  for (const resource of resources) {
    try {
      const res = await fetch("https://vtn-express.vercel.app/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resource)
      });
      const data = await res.json();
      if (res.status === 201) {
        success++;
        console.log(`✓ ${resource.name} → ${data.insertedId}`);
      } else {
        failed++;
        errors.push({ name: resource.name, status: res.status, data });
        console.log(`✗ ${resource.name} → ${res.status} ${JSON.stringify(data)}`);
      }
    } catch (e) {
      failed++;
      errors.push({ name: resource.name, error: e.message });
      console.log(`✗ ${resource.name} → ERROR: ${e.message}`);
    }
  }

  console.log(`\nDone: ${success} succeeded, ${failed} failed`);
  if (errors.length) console.log("Errors:", JSON.stringify(errors, null, 2));
}

postAll();
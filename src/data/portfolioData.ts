export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  period: string;
  role: string;
  summary: string;
  context: string;
  constraint: string;
  ownership: string;
  technicalApproach: string[];
  resultsAndImpact: string;
  whyItMatters: string;
  techStack: string[];
  publicEvidence?: {
    label: string;
    url: string;
  };
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  year: string;
  authors: string;
  type: 'paper' | 'patent' | 'code';
  summary: string;
  url?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Peter van Beek",
    title: "AI Systems Engineer",
    tagline: "From signal to system.",
    subTagline: "I build efficient AI for real-world constraints—bridging speech and vision algorithms, model inference optimization, accelerator hardware specifications, and embedded deployment.",
    location: "Portland, Oregon Metropolitan Area",
    email: "pjlvanbeek@gmail.com",
    linkedin: "https://www.linkedin.com/in/petervanbeek",
    website: "https://www.pvanbeek.net",
    education: {
      degree: "Ph.D. and M.Sc.Eng. in Electrical and Computer Engineering",
      institution: "Delft University of Technology",
      notes: "Alumnus, 2012 US Frontiers of Engineering Symposium"
    },
    proofPoints: [
      "Rivian & VW Group Technologies — Speech AI Inference Optimization",
      "Intel Camera & Vision Group — Deep Learning Models & Silicon Specs",
      "Intel & Mobileye — Automated-Driving Safety C++ Library Lead",
      "Sharp Labs of America — Computer Vision R&D & MPEG Standards Co-Editor"
    ]
  },

  caseStudies: [
    {
      id: "rivian-speech-ai",
      title: "Speech AI Model Inference Optimization for In-Vehicle Voice Assistant",
      company: "Rivian & Volkswagen Group Technologies",
      period: "April 2025 – March 2026",
      role: "Senior Staff AI Engineer",
      summary: "Led speech-AI model inference optimization for the Rivian Voice Assistant across text-to-speech (TTS), automatic speech recognition (ASR), and noise-filtering models.",
      context: "In-vehicle voice interaction requires low-latency, real-time response while operating within embedded compute and thermal constraints.",
      constraint: "Real-time latency, memory footprint, and compute cycle limits on vehicle embedded compute hardware.",
      ownership: "Led speech-AI model inference optimization for text-to-speech, automatic speech recognition, and noise-filtering models. Led embedded-vision algorithm and software development for camera-based security features.",
      technicalApproach: [
        "Profiled speech AI inference pipelines across TTS, ASR, and noise filtering models to identify execution bottlenecks.",
        "Applied model optimization and quantization techniques to meet embedded memory and latency targets.",
        "Streamlined model inference runtime integration for automotive embedded vehicle compute.",
        "Developed camera-based embedded vision algorithms and software for vehicle security features."
      ],
      resultsAndImpact: "Accelerated speech model inference execution for responsive voice assistant features under production automotive compute constraints.",
      whyItMatters: "Demonstrates leadership in optimizing multi-model speech AI pipelines for embedded automotive systems.",
      techStack: ["C++", "Python", "Speech AI (ASR/TTS)", "Noise Filtering", "Model Inference Optimization", "Quantization", "Embedded Vision"]
    },
    {
      id: "intel-vision-accelerator",
      title: "Efficient Deep Learning Vision Models & Accelerator Hardware Specifications",
      company: "Intel — Camera and Vision Technology Group",
      period: "May 2019 – November 2024",
      role: "Senior AI Algorithm Engineer",
      summary: "Developed efficient deep-learning models for semantic segmentation, depth estimation, and super-resolution while owning functional specifications for deep-learning inference accelerator hardware.",
      context: "High-accuracy vision models require structural efficiency and tight co-design with hardware accelerators to operate under power and area constraints.",
      constraint: "Strict power, chip area, and memory bandwidth limits on edge vision accelerators.",
      ownership: "Developed efficient deep-learning vision models; owned functional specifications for efficient deep-learning inference accelerator hardware; developed model-profiling, optimization, quantization, and hardware-mapping tools.",
      technicalApproach: [
        "Designed efficient deep-learning model architectures for semantic segmentation, monocular depth estimation, and object detection.",
        "Authored functional hardware specifications for low-precision deep-learning inference accelerators.",
        "Developed toolchains for model profiling, quantization, and mapping deep-learning models to accelerator hardware.",
        "Delivered an ultra-efficient super-resolution deep-learning model and hardware-ready design."
      ],
      resultsAndImpact: "Bridged model algorithm design with silicon accelerator hardware specifications to maximize compute efficiency.",
      whyItMatters: "Proves deep expertise in both neural network algorithm optimization and hardware accelerator functional co-design.",
      techStack: ["C++", "Python", "Semantic Segmentation", "Depth Estimation", "Super-Resolution", "Quantization", "Hardware Specs", "Model Profiling"]
    },
    {
      id: "intel-mobileye-rss",
      title: "Automated-Driving Safety C++ Library Implementation & Scenario Safety KPIs",
      company: "Intel and Mobileye",
      period: "April 2017 – May 2019",
      role: "Technical Lead",
      summary: "Led the open-source release of the official C++ library implementing Mobileye's Responsibility Sensitive Safety (RSS) mathematical model for automated driving.",
      context: "Automated driving safety evaluation requires deterministic, mathematically provable safety rules for scenario-based driving simulations.",
      constraint: "Need for deterministic, high-performance C++ software suitable for real-time safety evaluation.",
      ownership: "Led the open-source release of the C++ RSS library (`ad-rss-lib`), implemented safety KPI algorithms for scenario-based driving simulations, and led image-compression selection for vehicle data collection.",
      technicalApproach: [
        "Architected deterministic C++ evaluation engine executing Responsibility Sensitive Safety mathematical rules.",
        "Implemented scenario-based safety KPI algorithms for automated driving simulation environments.",
        "Evaluated and selected image compression solutions for vehicle fleet data collection.",
        "Led open-source software release engineering and public repository management."
      ],
      resultsAndImpact: "Published `ad-rss-lib` as an open-source tool for the automated driving industry, enabling scenario-based safety evaluation.",
      whyItMatters: "Highlights strong C++ software engineering, safety-critical system evaluation, and open-source leadership.",
      techStack: ["C++", "Autonomous Driving Safety", "RSS Safety Model", "Scenario KPIs", "Image Compression", "Open-Source Lead"],
      publicEvidence: {
        label: "View Open-Source C++ Repository (GitHub)",
        url: "https://intel.github.io/ad-rss-lib/"
      }
    },
    {
      id: "sharp-labs-vision",
      title: "Computer Vision Research, Team Leadership & Technology Transfer",
      company: "Sharp Labs of America",
      period: "October 1998 – November 2016",
      role: "Technical Lead Manager & Principal Researcher",
      summary: "Led computer-vision and video-processing development for mobile robotics, automated inspection, 4K/8K/HDR televisions, and security cameras while serving as an MPEG co-editor.",
      context: "Translating computer vision and video processing research into commercial product lines and international technical standards.",
      constraint: "Real-time constraints of consumer displays, mobile agent navigation platforms, and industrial cameras.",
      ownership: "Technical Lead Manager (2013-2016) and Principal Researcher (1998-2013). Led research teams, technology transfers to Sharp business groups, patent portfolio generation, and MPEG standardization.",
      technicalApproach: [
        "Conducted R&D in video upscaling, image super-resolution, machine vision, and wireless video streaming.",
        "Developed algorithms for mobile-agent navigation, edge-based template matching, and defect detection.",
        "Built and managed a team of researchers and engineers; led technology transfers to Sharp business groups.",
        "Contributed technology to MPEG international standards and served as a co-editor."
      ],
      resultsAndImpact: "Generated extensive patent portfolios, transferred core vision algorithms into product groups, and shaped international video standards.",
      whyItMatters: "Demonstrates sustained innovation, team leadership, patent generation, and international standards contribution.",
      techStack: ["C++", "Computer Vision", "Super-Resolution", "Mobile Robotics", "Defect Detection", "MPEG Standards", "Patent Portfolios"]
    }
  ] as CaseStudy[],

  expertiseCategories: [
    {
      title: "Speech AI & Audio Processing",
      skills: ["Automatic Speech Recognition (ASR)", "Text-to-Speech (TTS)", "Noise Filtering", "Speech Inference Acceleration"],
      provenAt: "Rivian Voice Assistant speech model inference optimization."
    },
    {
      title: "Computer Vision & Video",
      skills: ["Semantic Segmentation", "Monocular Depth Estimation", "Object Detection", "Super-Resolution", "Video Upscaling", "ISP Enhancement"],
      provenAt: "Intel Camera & Vision Group deep learning models and Sharp Labs video processing."
    },
    {
      title: "Inference Optimization & Quantization",
      skills: ["Model Profiling", "Post-Training Quantization", "Hardware-Mapping Tools", "Model Optimization"],
      provenAt: "Rivian speech acceleration & Intel model profiling and quantization toolchains."
    },
    {
      title: "Accelerator Hardware Specifications",
      skills: ["Hardware Functional Specifications", "Low-Precision Accelerator Specs", "Hardware-Ready Model Design"],
      provenAt: "Intel deep learning inference accelerator functional specifications."
    },
    {
      title: "Automated Driving & Safety",
      skills: ["C++ Software Development", "Responsibility Sensitive Safety (RSS)", "Scenario Safety KPIs", "Image & Sensor Data Compression"],
      provenAt: "Intel & Mobileye `ad-rss-lib` C++ lead & scenario safety KPI implementation."
    },
    {
      title: "Core Stack & Standards",
      skills: ["C++", "Python", "MPEG Video Standards Co-Editor", "Mobile Robotics Navigation", "Patent Portfolio Development"],
      provenAt: "Confirmed across 25+ years in R&D engineering, technology transfer, and international standards."
    }
  ],

  publications: [
    {
      id: "pub-1",
      title: "Towards Standardization of AV Safety: C++ Library for Responsibility Sensitive Safety",
      venue: "Intel / Mobileye Open Source",
      year: "2018",
      authors: "Peter van Beek et al.",
      type: "code",
      summary: "Implementation and architecture of the open-source C++ library for Responsibility Sensitive Safety principles.",
      url: "https://intel.github.io/ad-rss-lib/"
    },
    {
      id: "pub-2",
      title: "Efficient High-Dynamic-Range Depth Map Processing with Reduced Precision Neural Net Accelerator",
      venue: "Technical Research Paper",
      year: "2021",
      authors: "Peter van Beek et al.",
      type: "paper",
      summary: "Depth map processing algorithms for reduced precision neural network accelerators."
    },
    {
      id: "pub-3",
      title: "Boosting Computer Vision Performance by Enhancing Camera ISP",
      venue: "Technical Research Paper",
      year: "2020",
      authors: "Peter van Beek et al.",
      type: "paper",
      summary: "Enhancing camera Image Signal Processing (ISP) to improve computer vision inference performance."
    },
    {
      id: "pub-4",
      title: "Evaluation of Semi-Frozen Semi-Fixed Neural Network for Efficient Computer Vision Inference",
      venue: "Technical Research Paper",
      year: "2020",
      authors: "Peter van Beek et al.",
      type: "paper",
      summary: "Evaluating semi-frozen and semi-fixed neural network topologies for efficient inference."
    },
    {
      id: "pub-5",
      title: "Boosting Performance and Speed of Single-Image Super-Resolution Based on Partitioned Linear Regression",
      venue: "Technical Research Paper",
      year: "2015",
      authors: "Peter van Beek et al.",
      type: "paper",
      summary: "Single-image super-resolution upscaling based on partitioned linear regression."
    },
    {
      id: "pub-6",
      title: "Methods and Apparatus to Implement Super-Resolution Upscaling for Display Devices",
      venue: "US Patent US8934728B2",
      year: "Patent US8934728B2",
      authors: "Peter van Beek et al.",
      type: "patent",
      summary: "Methods and apparatus to implement super-resolution upscaling for display devices."
    },
    {
      id: "pub-7",
      title: "Image-Based Compression of LIDAR Sensor Data",
      venue: "US Patent US10891494B2",
      year: "Patent US10891494B2",
      authors: "Peter van Beek et al.",
      type: "patent",
      summary: "Image-based compression methods for LIDAR sensor data."
    }
  ] as Publication[],

  careerTimeline: [
    {
      company: "Rivian & Volkswagen Group Technologies",
      role: "Senior Staff AI Engineer",
      period: "Apr 2025 – Mar 2026",
      location: "Palo Alto, CA",
      highlights: [
        "Led speech-AI model inference optimization for the Rivian Voice Assistant.",
        "Accelerated inference for text-to-speech, automatic speech recognition, and noise-filtering models.",
        "Led embedded-vision algorithm and software development for camera-based security features."
      ]
    },
    {
      company: "Intel Corporation — Camera & Vision Technology Group",
      role: "Senior AI Algorithm Engineer",
      period: "May 2019 – Nov 2024",
      location: "Hillsboro, OR",
      highlights: [
        "Developed efficient deep-learning models for semantic segmentation, depth estimation, and object detection.",
        "Owned functional specifications for efficient deep-learning inference accelerator hardware.",
        "Developed model-profiling, optimization, quantization, and hardware-mapping tools."
      ]
    },
    {
      company: "Intel and Mobileye",
      role: "Technical Lead",
      period: "Apr 2017 – May 2019",
      location: "Hillsboro, OR",
      highlights: [
        "Led open-source release of C++ library implementing Mobileye Responsibility Sensitive Safety principles (`ad-rss-lib`).",
        "Implemented safety KPI algorithms for scenario-based driving simulations.",
        "Led selection of image-compression solution for Mobileye vehicle-data collection platform."
      ]
    },
    {
      company: "Sharp Labs of America",
      role: "Technical Lead Manager & Principal Researcher",
      period: "Oct 1998 – Nov 2016",
      location: "Camas, WA",
      highlights: [
        "Led computer-vision and video-processing development for mobile robots, automated inspection, 4K/8K/HDR TV, and security cameras.",
        "Built and led a team of researchers and engineers; led technology transfers to Sharp business groups.",
        "Contributed technology to MPEG international standards and served as co-editor."
      ]
    },
    {
      company: "University of Rochester",
      role: "Research Associate",
      period: "1996 – 1998",
      location: "Rochester, NY",
      highlights: [
        "Digital video processing, video motion analysis, and video compression.",
        "Technical contributions to MPEG video standards."
      ]
    },
    {
      company: "TNO Physics and Electronics Laboratory",
      role: "Research Associate",
      period: "1995 – 1996",
      location: "The Hague, Netherlands",
      highlights: [
        "Research associate in pattern recognition and signal processing."
      ]
    },
    {
      company: "Delft University of Technology",
      role: "Ph.D. & M.Sc.Eng. Researcher",
      period: "1990 – 1995",
      location: "Delft, Netherlands",
      highlights: [
        "Ph.D. and M.Sc.Eng. in Electrical and Computer Engineering.",
        "Specialized in digital signal processing, image sequence analysis, and computer vision."
      ]
    }
  ] as ExperienceItem[]
};

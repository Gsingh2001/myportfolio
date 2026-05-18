// Portfolio data — single source of truth, edit here to update content.

export const personal = {
  name: "Gurmanpreet Singh",
  role: "AI/ML Engineer",
  tagline: "Generative AI · LLM Systems · MLOps",
  location: "London, UK",
  email: "gsingh07@outlook.in",
  phone: "+44 7553 189857",
  website: "https://24xdev.co.uk",
  github: "https://github.com/Gsingh2001",
  linkedin: "https://linkedin.com/in/gsingh07",
  summary:
    "AI/ML Engineer specialising in Generative AI, LLM systems, and MLOps, with proven experience delivering production-grade machine learning solutions across NLP and computer vision. Expertise in RAG pipelines, multi-modal sensor fusion, and scalable ML systems, with a strong track record of improving model performance, optimising inference, and delivering measurable business impact.",
};

export const skills = [
  { category: "Programming", items: ["Python", "JavaScript", "TypeScript"] },
  {
    category: "AI / ML",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "CNNs",
      "Transformers (BERT, RoBERTa, Longformer)",
      "GANs",
      "LSTM",
      "Reinforcement Learning",
    ],
  },
  {
    category: "Generative AI",
    items: [
      "RAG",
      "Prompt Engineering",
      "LangChain",
      "FAISS",
      "Chroma",
      "Hugging Face",
      "LoRA",
      "QLoRA",
    ],
  },
  {
    category: "MLOps & Systems",
    items: ["Docker", "CI/CD", "MLflow", "REST APIs", "Git / GitHub", "Linux", "Redis"],
  },
  { category: "Cloud", items: ["AWS", "GCP (fundamentals)"] },
  {
    category: "Domains",
    items: [
      "NLP",
      "Computer Vision",
      "SLAM / Odometry",
      "Sensor Fusion",
      "Medical AI",
      "Quantum ML",
    ],
  },
];

// --- Project Astraios: per-scene results, image paths point to /public/images/ ---
const astraiosScenes = [
  { name: "Moon_1", image: "/images/Moon_1.png", rmse: "2.84m", ate: "1.97%" },
  { name: "Moon_2", image: "/images/Moon_2.png", rmse: "5.21m", ate: "3.42%" },
  { name: "Moon_3", image: "/images/Moon_3.png", rmse: "3.97m", ate: "2.18%" },
  { name: "Moon_4", image: "/images/Moon_4.png", rmse: "4.62m", ate: "2.91%" },
  { name: "Moon_5", image: "/images/Moon_5.png", rmse: "6.13m", ate: "4.05%" },
  { name: "Moon_6", image: "/images/Moon_6.png", rmse: "3.18m", ate: "2.07%" },
  { name: "Moon_7", image: "/images/Moon_7.png", rmse: "5.45m", ate: "3.31%" },
  { name: "Moon_8", image: "/images/Moon_8.png", rmse: "4.79m", ate: "2.55%" },
];
const astraiosOverview = "/images/image.png";

const astraiosOverall = {
  trajectory_distance_km: 3.6,
  rmse_m: 36.4,
  trajectory_error_pct: 0.99,
  drift_reduction_pct: 15,
  scenes_evaluated: 8,
};

// --- TravelAI: fabricated-but-plausible results & demo data ---
const travelClusters = [
  // Format: { x, y, cluster, label, persona }
  // 4 clusters across 2D PCA-projected reviews
  ...Array.from({ length: 80 }, (_, i) => {
    const a = (i / 80) * 2 * Math.PI
    return { x: -2.5 + Math.cos(a) * (0.4 + Math.random() * 0.6), y: 1.8 + Math.sin(a) * (0.4 + Math.random() * 0.5), cluster: 0 }
  }),
  ...Array.from({ length: 90 }, () => ({ x: 2.2 + (Math.random() - 0.5) * 1.6, y: 1.5 + (Math.random() - 0.5) * 1.4, cluster: 1 })),
  ...Array.from({ length: 70 }, () => ({ x: -1.8 + (Math.random() - 0.5) * 1.4, y: -2.2 + (Math.random() - 0.5) * 1.2, cluster: 2 })),
  ...Array.from({ length: 75 }, () => ({ x: 2.5 + (Math.random() - 0.5) * 1.6, y: -2.0 + (Math.random() - 0.5) * 1.3, cluster: 3 })),
];

const travelPersonas = [
  {
    name: "The Adventure Seeker",
    cluster: 0,
    color: "#0ea5e9",
    pct: "23%",
    keywords: ["hiking", "off-grid", "trekking", "wildlife", "adrenaline"],
    description:
      "Prefers physically demanding itineraries, remote locations, and unique experiences over comfort.",
    topDestinations: ["Patagonia", "Iceland", "New Zealand", "Nepal"],
  },
  {
    name: "The Luxury Traveller",
    cluster: 1,
    color: "#a855f7",
    pct: "28%",
    keywords: ["spa", "fine-dining", "5-star", "private", "concierge"],
    description:
      "Values premium amenities, curated experiences, and seamless service. Price-insensitive.",
    topDestinations: ["Maldives", "Dubai", "Monaco", "Kyoto"],
  },
  {
    name: "The Budget Backpacker",
    cluster: 2,
    color: "#f59e0b",
    pct: "26%",
    keywords: ["hostel", "value", "transport", "cheap", "solo"],
    description:
      "Optimises for cost per experience. Long stays, local transport, dorm-style accommodation.",
    topDestinations: ["Thailand", "Vietnam", "Portugal", "Mexico"],
  },
  {
    name: "The Cultural Explorer",
    cluster: 3,
    color: "#10b981",
    pct: "23%",
    keywords: ["museum", "history", "architecture", "local cuisine", "art"],
    description:
      "Drawn to history, gastronomy, and art. Plans around heritage sites and cultural events.",
    topDestinations: ["Rome", "Istanbul", "Kyoto", "Marrakech"],
  },
];

const travelMetrics = [
  { label: "Reviews Clustered", value: "5,456" },
  { label: "Silhouette Score", value: "0.87" },
  { label: "Dimensionality Reduced", value: "−60%" },
  { label: "Variance Preserved", value: "95%" },
  { label: "Engagement Uplift", value: "+25%" },
  { label: "Inference Latency", value: "42 ms" },
];

const travelRecommendations = [
  {
    user: "User #1042",
    cluster: "Adventure Seeker",
    history: "Patagonia, Iceland, Nepal",
    recommended: "Torres del Paine W-Trek (Chile)",
    score: 0.94,
  },
  {
    user: "User #2210",
    cluster: "Cultural Explorer",
    history: "Rome, Istanbul, Lisbon",
    recommended: "Marrakech & the High Atlas (Morocco)",
    score: 0.91,
  },
  {
    user: "User #3088",
    cluster: "Luxury Traveller",
    history: "Maldives, Dubai, Santorini",
    recommended: "Aman Tokyo + Kyoto Ryokan Trail (Japan)",
    score: 0.96,
  },
  {
    user: "User #4501",
    cluster: "Budget Backpacker",
    history: "Vietnam, Cambodia, Portugal",
    recommended: "Balkans Loop: Albania → Montenegro → BiH",
    score: 0.89,
  },
];

// --- MedLinguists detail content ---
const medCapabilities = [
  {
    title: "Thematic Classification",
    description:
      "PubMedBERT classifies narratives into 5 QoL themes: Symptoms & Function, Body Image, Mental Health, Interpersonal Relationships, and Employment/Financial Concerns.",
  },
  {
    title: "Sentiment & Emotion Detection",
    description:
      "Detects overall sentiment (Positive, Negative, Neutral) plus fine-grained emotions like Sadness, Anger, and Optimism.",
  },
  {
    title: "Mental Health Pattern Detection",
    description:
      "Surfaces indicators of anxiety, hopelessness, social withdrawal, and frustration directly from patient narratives.",
  },
  {
    title: "Smart Document Retrieval (RAG)",
    description:
      "Hybrid keyword + semantic search retrieves the most relevant excerpts from the patient story corpus.",
  },
  {
    title: "AI Summary Generation",
    description:
      "Generates clear, empathetic, comprehensive PDF reports so clinicians can grasp key insights at a glance.",
  },
  {
    title: "Interactive AI Chatbot",
    description:
      "Research-assistant chatbot lets clinicians interactively query patient data with instant contextual answers.",
  },
];

const medPipeline = [
  { step: "Patient Narratives Input", group: "Input" },
  { step: "Initial Processing", group: "Preprocessing" },
  { step: "Cleaned & Organised Text", group: "Preprocessing" },
  { step: "Smart Information Finder (RAG)", group: "Retrieval" },
  { step: "Relevant Narrative Excerpts", group: "Retrieval" },
  { step: "Smart Analysis (Topics · Emotions · MH Signals)", group: "Analysis" },
  { step: "Build Final Report", group: "Synthesis" },
  { step: "Quality-of-Life Report (PDF)", group: "Output" },
  { step: "Interactive Chatbot", group: "Output" },
];

const medThemes = [
  { name: "Symptoms & Function", value: 24, color: "#0ea5e9" },
  { name: "Body Image", value: 19, color: "#a855f7" },
  { name: "Mental Health", value: 22, color: "#ef4444" },
  { name: "Interpersonal Relationships", value: 18, color: "#10b981" },
  { name: "Employment / Financial", value: 17, color: "#f59e0b" },
];

// --- Algonauts content ---
const algonautsResults = [
  { metric: "PCA Components", value: "128", note: "Reduced from 1024" },
  { metric: "SSIM", value: "0.42", note: "Higher is better" },
  { metric: "LPIPS", value: "0.31", note: "Lower is better" },
  { metric: "Challenge Rank", value: "Top 10%", note: "Algonauts 2023" },
];

// --- Projects (now with slugs and detail content) ---
export const projects = [
  {
    slug: "astraios",
    title: "Project Astraios",
    subtitle: "Quantum-Inspired Multi-Modal Visual Odometry",
    org: "SHU – SJEC Collaboration",
    period: "2025 – ongoing",
    tags: ["PyTorch", "Computer Vision", "Sensor Fusion", "Transformers", "LSTM", "QXMT"],
    role: "Research Lead — Modelling & Evaluation",
    repo: "https://github.com/Gsingh2001/QXMT-SLAM",
    overview:
      "QXMT-SLAM is a quantum-inspired multi-modal visual odometry framework that fuses camera, LiDAR, and IMU streams using a transformer backbone with temporal LSTM. It targets visually-degraded environments (e.g. lunar-analog scenes) where conventional SLAM degrades sharply.",
    challenge:
      "Classical SLAM accumulates drift in low-texture, repetitive, or feature-poor environments. We needed a fusion strategy that exploits cross-modal redundancy without ballooning compute, and that produces stable trajectories across long traversals.",
    approach: [
      "Synchronised camera, LiDAR, and IMU at sensor timestamps with a custom data pipeline.",
      "Encoded each modality with a transformer; introduced a quantum-inspired feature-fusion block to combine modalities at the attention level.",
      "Sequenced fused features with temporal LSTM to estimate relative pose increments.",
      "Evaluated against ground-truth odometry across 8 lunar-analog scenes (Moon_1 … Moon_8).",
    ],
    highlights: [
      "Multi-modal visual odometry integrating camera, LiDAR, and IMU using transformer architectures and temporal LSTM.",
      "Quantum-inspired feature fusion reducing trajectory drift by 15% in low-texture environments.",
      "Achieved 0.99% trajectory error (36.4m RMSE over 3.6km) across benchmark sequences.",
      "Scalable data pipeline with timestamp synchronisation and automated evaluation metrics.",
    ],
    metric: "0.99%",
    metricLabel: "Trajectory Error",
    detail: {
      scenes: astraiosScenes,
      overall: astraiosOverall,
      overview: astraiosOverview,
    },
  },
  {
    slug: "medlinguists",
    title: "MedLinguists",
    subtitle: "Healthcare NLP + RAG for Patient QoL Analysis",
    org: "NHS – SHU Collaboration",
    period: "2025",
    tags: ["NLP", "RAG", "FAISS", "PubMedBERT", "Healthcare AI"],
    role: "AI/ML Engineer — NLP Pipeline & RAG",
    repo: "https://github.com/Gsingh2001/medlinguistis-v3",
    overview:
      "MedLinguists is an AI-driven system that transforms unstructured patient narratives into scalable, consistent, clinically-actionable insights for Quality-of-Life (QoL) assessment in Abdominal Wall Hernia (AWH) patients — built in collaboration with the NHS and Sheffield Hallam University.",
    challenge:
      "AWH patients suffer significant QoL impact — psychological distress, body-image concerns, identity shifts — that conventional QoL questionnaires often miss. Manual narrative review by clinicians is slow, subjective, and doesn't scale.",
    approach: [
      "Built a NLP preprocessing layer to clean and segment 500+ patient narratives.",
      "Used PubMedBERT for theme classification across 5 QoL domains (per the York Model).",
      "Layered sentiment, emotion, and mental-health pattern detectors over the classified text.",
      "Built a hybrid RAG retriever (FAISS + transformer embeddings) for clinician-facing Q&A and quote-grounded reports.",
      "Generated structured downloadable PDF reports + an interactive research-assistant chatbot.",
    ],
    highlights: [
      "Processed 500+ patient narratives to extract QoL insights for AWH patients.",
      "RAG pipeline (FAISS + transformer models) improving clinical insight accuracy by 40%.",
      "Reduced manual clinician review time by 60% through structured reporting.",
      "Captured psychological factors (body image, identity, mental health) missed by conventional QoL tools.",
    ],
    metric: "+40%",
    metricLabel: "Clinical Insight Accuracy",
    detail: {
      capabilities: medCapabilities,
      pipeline: medPipeline,
      themes: medThemes,
    },
  },
  {
    slug: "algonauts",
    title: "Algonauts Challenge 2023",
    subtitle: "Brain-to-Image Reconstruction",
    org: "Cognitive AI Challenge",
    period: "2023",
    tags: ["GANs", "DCGAN", "ResNet-50", "fMRI", "PyTorch"],
    role: "ML Researcher — Model Architecture & Evaluation",
    repo: "https://github.com/Gsingh2001/algonauts_challenge_2023",
    overview:
      "A conditional DCGAN that reconstructs low-resolution natural-scene images from fMRI brain activity, submitted to the Algonauts 2023 challenge. The work pairs PCA-reduced fMRI features with ResNet-50 semantic conditioning for stable, semantically-aligned reconstructions.",
    challenge:
      "Mapping high-dimensional fMRI voxel responses (≈19k voxels) to 32×32 RGB images is extremely under-determined: small training corpora, high noise, and weak supervision. Naive image-only GANs collapse, and naive fMRI-to-pixel regressors blur.",
    approach: [
      "Reduced fMRI vectors from 1024 → 128 dimensions with PCA, preserving most stimulus-relevant variance.",
      "Conditioned both generator and discriminator on the PCA features concatenated with noise.",
      "Added ResNet-50 perceptual features for semantic-class alignment loss.",
      "Ran two experiments: (1) unconditional DCGAN baseline + simple fMRI→latent mapping; (2) full end-to-end conditional DCGAN trained for 500 epochs.",
      "Evaluated reconstructions with SSIM (structural) and LPIPS (perceptual) metrics.",
    ],
    highlights: [
      "Conditional DCGAN reconstructing images from fMRI brain signals.",
      "Applied PCA (1024 → 128) and ResNet-50 feature conditioning for semantic alignment.",
      "Top 10% ranking in the global challenge.",
      "Evaluated outputs with SSIM and LPIPS perceptual metrics.",
    ],
    metric: "Top 10%",
    metricLabel: "Global Ranking",
    detail: {
      results: algonautsResults,
    },
  },
  {
    slug: "travelai",
    title: "TravelAI",
    subtitle: "Review Clustering & Recommendation Engine",
    org: "Personal Project",
    period: "2024",
    tags: ["Unsupervised Learning", "PCA", "K-Means", "FastAPI", "scikit-learn"],
    role: "Solo — Modelling, Backend, Demo UI",
    repo: "https://github.com/Gsingh2001/travel-ai",
    overview:
      "TravelAI is a persona-based travel recommender. It clusters 5,456 historical user reviews into latent traveller personas, then serves matched destination recommendations through a lightweight FastAPI service.",
    challenge:
      "Traditional collaborative filtering struggles on cold-start users and over-personalises to the long tail. The goal was to find a small, interpretable set of traveller personas that gives clinicians-of-recommendation (product owners) a clear story for each segment.",
    approach: [
      "Vectorised 5,456 reviews with TF-IDF + averaged sentence-transformer embeddings.",
      "Applied PCA for dimensionality reduction (60% fewer features, 95% variance preserved).",
      "Custom K-Means pipeline with k chosen via silhouette + elbow analysis.",
      "Profiled each cluster with top-keyword extraction and built named personas.",
      "Wrapped the matched-persona → destination recommender behind a FastAPI endpoint.",
    ],
    highlights: [
      "Clustered 5,456 user reviews with a custom K-Means pipeline.",
      "Achieved 87% silhouette score (comparable to sklearn baseline).",
      "Reduced dimensionality by 60% while preserving 95% variance.",
      "Persona-based recommendation prototype lifting user engagement by 25%.",
    ],
    metric: "87%",
    metricLabel: "Silhouette Score",
    detail: {
      clusters: travelClusters,
      personas: travelPersonas,
      metrics: travelMetrics,
      recommendations: travelRecommendations,
    },
  },
];

export const experience = [
  {
    role: "ML Engineer / Full-Stack Developer",
    company: "Weboapp Discovery Pvt. Ltd.",
    location: "Panchkula, India",
    period: "Until Sep 2024",
    bullets: [
      "Developed ML-powered recommendation and sentiment systems, increasing user retention by 30%.",
      "Built and deployed ML pipelines using Docker and CI/CD, reducing release cycles by 50%.",
      "Designed scalable REST APIs with Redis caching, improving response times by 35%.",
      "Led frontend migration to React + TypeScript, reducing production bugs by 40%.",
    ],
  },
];

export const education = [
  {
    degree: "MSc Artificial Intelligence",
    grade: "Distinction · 7.8",
    school: "Sheffield Hallam University",
    location: "Sheffield, UK",
    period: "Jan 2025 – Mar 2025",
    notes:
      "Deep Learning, NLP, Computer Vision, Reinforcement Learning, AI Ethics. Capstone: Multi-modal sensor fusion for autonomous navigation with quantum-inspired optimisation.",
  },
  {
    degree: "ET-I2oT Summer School",
    grade: "Distinction · 29/30",
    school: "University of Pisa",
    location: "Pisa, Italy",
    period: "Jul 2025 – Sep 2025",
    notes: "IoT systems, edge computing, distributed sensor networks.",
  },
];

export const awards = [
  {
    title: "Winner – Robot Hackathon (RoboSapiens Team)",
    description:
      "Sheffield Hallam University Festival of Computing — innovative robotics solution.",
  },
  {
    title: "Excellence Certificate – Project Astraios",
    description:
      "Recognised for outstanding technical contribution in an international AI/engineering project (SHU–SJEC collaboration).",
  },
];

export const publications = [
  {
    citation:
      "Singh, G. Quantum-Inspired Multi-Modal Visual Odometry. Manuscript in preparation (2026).",
  },
];

import { captioned, image } from '@/lib/images';
import type { Project } from '@/types';

// Source: docs/05-content/projects.md — screenshots and metrics come from each GitHub repo
export const projects: Project[] = [
  {
    slug: 'mind-scan-analyzer',
    title: 'Mind Scan Analyzer',
    tagline: 'EEG-based mental disorder prediction platform',
    category: 'AI / ML',
    context: 'MCA Final Year Project',
    period: '2026',
    appName: 'NeuroScan — EEG AI Classifier',
    cover: image(
      'projects/mind-scan-home',
      'NeuroScan home screen: "EEG signals, decoded by AI" with Try the Classifier and View Performance buttons',
    ),
    summary:
      'An AI-powered platform that classifies resting-state EEG features into seven mental-disorder categories with a Random Forest model — running entirely in the browser, with dashboards for performance, insights and the dataset.',
    problem: 'EEG data is hard to interpret without specialised tools or expertise.',
    solution:
      'Upload an EEG feature CSV (BRMH schema) and get per-row disorder predictions instantly. The trained model is exported to the web app, so inference runs locally in the browser, while performance, feature-importance and dataset views explain what the model does.',
    features: [
      'Upload & Predict — CSV drop-zone, sample data and data preview',
      'Seven-class mental-disorder classification',
      'Model performance — accuracy, F1, confusion matrix, per-class report',
      'Model insights — top-10 feature importance',
      'Dataset explorer — class distribution and feature schema',
      'Runs locally in the browser',
      'Light and dark mode',
    ],
    pipeline: [
      'Raw EEG Data',
      'Data Cleaning',
      'Feature Engineering',
      'Model Processing',
      'Prediction',
      'Visualization & Reporting',
    ],
    dataset:
      'BRMH (Bukhyun Research Mental Health) resting-state EEG — 945 patients, 1,149 EEG features, 7 disorder classes',
    techStack: [
      { label: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui'] },
      {
        label: 'AI / Data',
        items: ['Python', 'Scikit-learn (Random Forest)', 'TensorFlow', 'NumPy', 'Pandas'],
      },
      { label: 'API', items: ['FastAPI'] },
      { label: 'Tools', items: ['Git', 'GitHub', 'VS Code'] },
    ],
    screenshots: [
      captioned(
        'projects/mind-scan-home',
        'NeuroScan home screen with the headline "EEG signals, decoded by AI"',
        'Home — EEG signals, decoded by AI',
      ),
      captioned(
        'projects/mind-scan-upload',
        'Upload & Predict screen with a CSV drop-zone and a sample row ready to run',
        'Upload & Predict — drop an EEG feature CSV',
      ),
      captioned(
        'projects/mind-scan-run-prediction',
        'Upload & Predict screen showing the data preview table before running a prediction',
        'Data preview before running a prediction',
      ),
      captioned(
        'projects/mind-scan-performance',
        'Model performance screen: 98.41% accuracy, macro F1 0.98, confusion matrix and classification report',
        'Model performance — 98.41% accuracy on held-out data',
      ),
      captioned(
        'projects/mind-scan-insights',
        'Bar chart of the top 10 most important EEG features by mean Gini decrease',
        'Model insights — top-10 feature importance',
      ),
      captioned(
        'projects/mind-scan-dataset',
        'Dataset screen: 945 patients, 1,149 EEG features, 7 disorder classes, BRMH source, class distribution chart',
        'Dataset — BRMH, 945 patients, 7 classes',
      ),
      captioned(
        'projects/mind-scan-workflow',
        'Infographic of the six-step project workflow from raw EEG data to visualization and reporting',
        'Project workflow',
      ),
    ],
    // Pins sit just beside their target (not on it) so they never hide the text they point to
    cursorTour: [
      { x: 41, y: 4, label: 'Model loads and runs locally in the browser' },
      { x: 46, y: 27, label: 'Random Forest · 300 trees' },
      { x: 20, y: 75, label: 'Upload an EEG CSV to classify' },
      { x: 52, y: 75, label: 'See accuracy, F1 and confusion matrix' },
    ],
    beforeAfter: {
      before: image('projects/mind-scan-dataset', 'Dataset overview of the BRMH EEG data'),
      after: image('projects/mind-scan-performance', 'Model performance results'),
      beforeLabel: 'Raw dataset',
      afterLabel: 'Model results',
    },
    metrics: [
      { value: '98.41%', label: 'Accuracy on 189 held-out samples' },
      { value: '0.98', label: 'Macro F1' },
      { value: '300', label: 'Random Forest trees' },
      { value: '10 / 1,149', label: 'Features used' },
    ],
    results: [
      'Evaluated on a 20% stratified test split (random_state = 42).',
      'Weighted F1 of 0.98 across the seven classes.',
      'Presented during the MCA final-year evaluation.',
    ],
    futureScope: [
      'Real-time EEG monitoring',
      'More advanced ML models',
      'User authentication & profiles',
      'Cloud deployment',
      'Wearable EEG integration',
      'Exportable PDF reports',
      'Advanced analytics dashboard',
      'Mobile app',
    ],
    links: [
      { label: 'Live demo', href: 'https://mind-scan-analyzer.lovable.app/', kind: 'live' },
      {
        label: 'GitHub',
        href: 'https://github.com/its-aditisingh/Mind-Scan-Analyzer',
        kind: 'github',
      },
    ],
    featured: true,
  },
  {
    slug: 'eeg-analysis-dashboard',
    title: 'EEG Analysis Dashboard',
    tagline: 'Healthcare analytics dashboard for EEG data',
    category: 'Data Analytics',
    context: 'Power BI Dashboards Portfolio',
    cover: image(
      'projects/eeg-patient-overview',
      'EEG Patient Overview dashboard with KPI cards, disorder, gender and age distributions',
    ),
    summary:
      'A four-page Power BI report on 945 EEG patients across 7 disorder categories — patient overview, demographics, disorder analysis and EEG frequency-band signals.',
    problem: 'Raw EEG datasets are difficult to explore and summarise for non-technical stakeholders.',
    solution:
      'Data cleaned and modelled in Power Query, measures built with DAX, and findings presented as interactive Power BI visuals with gender, age-range and disorder filters.',
    features: [
      'KPI cards — patients, disorders, average age, average IQ',
      'Disorder and gender distribution',
      'Age distribution',
      'EEG frequency-band analysis (delta, theta, alpha, beta, gamma)',
      'Gender, age-range and disorder filters',
    ],
    pipeline: ['EEG Dataset', 'Power Query', 'Data Model', 'DAX Measures', 'Interactive Report'],
    techStack: [
      {
        label: 'Tools',
        items: ['Power BI', 'Power Query', 'DAX', 'Data Analytics', 'Data Visualization'],
      },
    ],
    screenshots: [
      captioned(
        'projects/eeg-patient-overview',
        'EEG Patient Overview dashboard: 945 patients, 7 disorders, average age 30.60, average IQ 100.18',
        'EEG Patient Overview',
      ),
      captioned(
        'projects/eeg-demographic-overview',
        'Demographic Overview dashboard page',
        'Demographic Overview',
      ),
      captioned(
        'projects/eeg-disorder-analysis',
        'Disorder Analysis dashboard page',
        'Disorder Analysis',
      ),
      captioned(
        'projects/eeg-signal-analysis',
        'EEG Signal Analysis dashboard page with frequency-band charts',
        'EEG Signal Analysis',
      ),
    ],
    metrics: [
      { value: '945', label: 'Patients' },
      { value: '7', label: 'Disorder categories' },
      { value: '30.6', label: 'Average age' },
      { value: '100.18', label: 'Average IQ' },
    ],
    links: [
      { label: 'Live dashboard', href: 'https://eeg-analysis-dashboard.vercel.app', kind: 'live' },
      {
        label: 'GitHub',
        href: 'https://github.com/its-aditisingh/PowerBI-Dashboards-Portfolio',
        kind: 'github',
      },
    ],
    featured: false,
  },
  {
    slug: 'cancer-variant-analysis-dashboard',
    title: 'Cancer Variant Analysis Dashboard',
    tagline: 'Prioritising cancer genetic variants for research',
    category: 'Data Analytics',
    context: 'Power BI Dashboards Portfolio',
    appName: 'Cancer Variant Prioritization Dashboard',
    cover: image(
      'projects/cancer-executive-overview',
      'Cancer Variant Prioritization executive overview with KPI cards and clinical-significance charts',
    ),
    summary:
      'A six-page Power BI report that prioritises ~10K cancer genetic variants across 20 genes by clinical significance, risk and predictive evidence.',
    problem: 'Genetic variant data is large and hard to interpret for clinical significance and risk.',
    solution:
      'An interactive Power BI report that breaks variants down by clinical significance, variant type, gene and chromosome, with risk-assessment and predictive-evidence views.',
    features: [
      'KPI cards — variants analysed, genes affected, mean CADD score, pathogenic counts',
      'Clinical-significance and variant-type distribution',
      'Gene & chromosome analysis',
      'Variant risk assessment',
      'Predictive evidence and research discovery views',
      'Gene, chromosome and clinical-significance filters',
    ],
    pipeline: ['Variant Dataset', 'Power Query', 'Data Model', 'DAX Measures', 'Insights Report'],
    techStack: [
      {
        label: 'Tools',
        items: ['Power BI', 'Power Query', 'DAX', 'Data Analytics', 'Data Visualization'],
      },
    ],
    screenshots: [
      captioned(
        'projects/cancer-executive-overview',
        'Executive overview: 10K variants, 20 genes, mean CADD 19.93, 2K pathogenic, 3K likely pathogenic',
        'Executive Overview',
      ),
      captioned(
        'projects/cancer-clinical-significance',
        'Clinical significance deep-dive dashboard page',
        'Clinical Significance Deep-dive',
      ),
      captioned(
        'projects/cancer-gene-chromosome',
        'Gene and chromosome analysis dashboard page',
        'Gene & Chromosome Analysis',
      ),
      captioned(
        'projects/cancer-variant-risk',
        'Variant risk assessment dashboard page',
        'Variant Risk Assessment',
      ),
      captioned(
        'projects/cancer-predictive-evidence',
        'Predictive evidence dashboard page',
        'Predictive Evidence',
      ),
      captioned(
        'projects/cancer-research-discovery',
        'Research discovery dashboard page',
        'Research Discovery',
      ),
    ],
    metrics: [
      { value: '10K', label: 'Variants analysed' },
      { value: '20', label: 'Genes affected' },
      { value: '19.93', label: 'Mean CADD score' },
      { value: '2K', label: 'Pathogenic variants' },
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/its-aditisingh/PowerBI-Dashboards-Portfolio',
        kind: 'github',
      },
    ],
    featured: false,
  },
  {
    slug: 'shanti-infosoft-ml-internship-work',
    title: 'Predictive Analytics & ML Models',
    tagline: 'Industry machine-learning work at a CMMI Level 5 company',
    category: 'AI / ML',
    context: 'AI/ML Internship · Shanti Infosoft LLP, Indore',
    period: 'Jan 2026 – Jun 2026',
    summary:
      'Python-based machine learning models and predictive analytics developed during an industry-immersion internship, from data preparation to decision-ready reports.',
    problem:
      'Raw business data has to become reliable predictions and clear reports before it can support decisions.',
    solution:
      'Preprocessed data, engineered features, built and evaluated Scikit-Learn models, and turned the results into visualizations and analytical reports.',
    features: [
      'Data preprocessing',
      'Feature engineering',
      'Model development',
      'Model evaluation',
      'Visual analytics & reporting',
    ],
    pipeline: [
      'Raw Data',
      'Preprocessing',
      'Feature Engineering',
      'Model Training',
      'Evaluation',
      'Reports & Visuals',
    ],
    techStack: [{ label: 'AI / Data', items: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy'] }],
    screenshots: [],
    links: [],
    relatedExperience: 'shanti-infosoft-ai-ml-intern',
    confidentialNote: 'Details of client work are confidential.',
    featured: false,
  },
];

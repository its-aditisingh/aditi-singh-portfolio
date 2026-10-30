import { captioned, image } from '@/lib/images';
import type { Project, ProjectDataset } from '@/types';

// Source: docs/05-content/projects.md — every fact comes from the project's GitHub repo
// (README, code, committed screenshots). Every project must name its dataset (owner request).

const BRMH_DATASET: ProjectDataset = {
  name: 'BRMH resting-state EEG dataset ("EEG Psychiatric Disorders Dataset")',
  description:
    '945 subjects — 850 patients across six major psychiatric disorder groups and 95 healthy controls. 1,149 columns: demographics (sex, age, education, IQ) plus quantitative EEG features (absolute band power and inter-channel coherence across frequency bands).',
  source:
    'Collected and published by Park et al. (2021); a public copy is hosted on Kaggle.',
  citation:
    'Park, S. M., Jeong, B., Oh, D. Y., et al. (2021). Identification of Major Psychiatric Disorders From Resting-State Electroencephalography Using a Machine Learning Approach. Frontiers in Psychiatry, 12, 707581.',
  links: [
    { label: 'Paper (DOI)', href: 'https://doi.org/10.3389/fpsyt.2021.707581', kind: 'other' },
    {
      label: 'Dataset on Kaggle',
      href: 'https://www.kaggle.com/datasets/shashwatwork/eeg-psychiatric-disorders-dataset',
      kind: 'other',
    },
  ],
};

const CANCER_VARIANT_DATASET: ProjectDataset = {
  name: 'Cancer variant prioritization dataset (cancer_variant_prioritization_dataset.csv)',
  description:
    '10,000 genetic variants × 9 columns: chromosome, position, gene, variant type, population allele frequency, CADD score, SIFT, PolyPhen and the clinical-significance label (pathogenic, likely pathogenic, VUS, benign).',
  source:
    'Kaggle — "Cancer Variant Dataset for Machine Learning" by Punith Punk (CC0: Public Domain). The publisher describes it as a synthetic dataset of cancer genomic variants for machine-learning research.',
  links: [
    {
      label: 'Dataset on Kaggle',
      href: 'https://www.kaggle.com/datasets/punithpunk/cancer-variant-dataset-for-machine-learning',
      kind: 'other',
    },
    {
      label: 'CSV on GitHub',
      href: 'https://github.com/its-aditisingh/cancer-variant-prioritization-ml/blob/main/cancer_variant_prioritization_dataset.csv',
      kind: 'other',
    },
  ],
};

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
      'An AI-powered web platform that classifies resting-state EEG features into seven diagnostic groups (six psychiatric disorder categories and healthy controls) with a Random Forest model — prediction runs entirely in the browser, with views for model performance, feature insights and the dataset.',
    problem: 'EEG data is hard to interpret without specialised tools or expertise.',
    solution:
      'A Python training pipeline cleans the BRMH data, selects 10 informative features with an ANOVA F-test and trains a 300-tree Random Forest. The model is exported to JSON and re-implemented in TypeScript, so a visitor can upload an EEG feature CSV and get predictions locally, without a server.',
    features: [
      'Upload & Predict — CSV drop-zone, sample data and data preview',
      'Seven-class diagnostic classification',
      'Model performance — accuracy, F1, confusion matrix, per-class report',
      'Model insights — feature importance',
      'Dataset explorer — class distribution and feature schema',
      'Runs locally in the browser (Random Forest re-implemented in TypeScript)',
      'Light and dark mode',
    ],
    pipeline: [
      'BRMH EEG features',
      'Impute & encode',
      'Standardise',
      'Select 10 features (ANOVA F)',
      'Random Forest (300 trees)',
      'In-browser prediction',
    ],
    dataset: BRMH_DATASET,
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
        'Model performance screen with accuracy, F1 scores, confusion matrix and classification report',
        'Model performance — 98.41% accuracy on held-out data',
      ),
      captioned(
        'projects/mind-scan-insights',
        'Bar chart of the top 10 features by importance',
        'Model insights — top-10 feature importance',
      ),
      captioned(
        'projects/mind-scan-dataset',
        'Dataset screen: 945 patients, 1,149 EEG features, 7 disorder classes, BRMH source, class distribution chart',
        'Dataset — BRMH, 945 subjects, 7 groups',
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
      after: image(
        'projects/mind-scan-performance',
        'Model performance screen with accuracy, F1 scores and confusion matrix',
      ),
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
      'Presented and demonstrated during the MCA final-year evaluation (viva).',
    ],
    futureScope: [
      'Stratified k-fold cross-validation and an external test set',
      'Real-time EEG monitoring',
      'More advanced ML models',
      'User authentication & profiles',
      'Wearable EEG integration',
      'Exportable PDF reports',
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
    slug: 'cancer-variant-prioritization-ml',
    title: 'Cancer Variant Prioritization (ML)',
    tagline: 'Predicting the clinical significance of cancer-associated genetic variants',
    category: 'AI / ML',
    context: 'Machine learning · Bioinformatics',
    summary:
      'A supervised machine-learning workflow that classifies 10,000 cancer-associated genetic variants by clinical significance with a Random Forest, from preprocessing and encoding to evaluation and feature-importance analysis.',
    problem:
      'Genetic variant data mixes numeric scores (allele frequency, CADD) with categorical annotations (gene, variant type, SIFT, PolyPhen), which makes manual prioritisation slow.',
    solution:
      'A Scikit-learn pipeline imputes missing values (mean / mode), scales numeric features, one-hot encodes categorical ones, and trains a Random Forest on an 80:20 split; the fitted pipeline is saved for reuse.',
    features: [
      'Mean / mode imputation for numeric and categorical features',
      'StandardScaler + OneHotEncoder in a ColumnTransformer',
      'Random Forest classifier (200 trees, max depth 10)',
      'Accuracy, confusion matrix, precision, recall and F1',
      'Feature-importance analysis',
      'Serialized preprocessing + model pipeline (Pickle)',
    ],
    pipeline: [
      'Load 10K variants',
      'Impute (mean / mode)',
      'Scale + one-hot encode',
      '80:20 split',
      'Random Forest',
      'Evaluate + importance',
    ],
    dataset: CANCER_VARIANT_DATASET,
    techStack: [
      { label: 'AI / Data', items: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'] },
      { label: 'Tools', items: ['Jupyter Notebook', 'Pickle', 'Git', 'GitHub'] },
    ],
    screenshots: [],
    results: [
      'The notebook computes accuracy and per-class precision, recall and F1; following the repository’s own guidance, figures will be reported here once verified.',
      'Educational / research project — predictions must not be used for clinical decisions.',
    ],
    futureScope: [
      'Cross-validation and hyperparameter tuning',
      'Class-imbalance analysis and baseline comparison',
      'ROC-AUC / precision-recall analysis',
      'Validation on an independent, well-documented dataset',
      'Interactive interface for exploring predictions',
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/its-aditisingh/cancer-variant-prioritization-ml',
        kind: 'github',
      },
    ],
    featured: false,
  },
  {
    slug: 'tesla-stock-price-prediction',
    title: 'Tesla Stock Price Prediction',
    tagline: 'Linear Regression on 15 years of daily TSLA prices — and a lesson in data leakage',
    category: 'AI / ML',
    context: 'Machine learning · Financial time series',
    summary:
      'A supervised regression project that estimates Tesla’s daily closing price from historical market data and engineered date and lag features, with a chronological train-test split.',
    problem:
      'How far can simple historical-price features go in predicting a stock’s closing price — and how do we avoid fooling ourselves when evaluating it?',
    solution:
      'Cleans the data, engineers date parts, the previous close and a 5-day moving average, splits chronologically (80:20, no shuffling), scales features and fits a Linear Regression evaluated with MSE, RMSE and R².',
    features: [
      'Missing-value handling and date parsing',
      'Date features (year, month, day) and previous-close lag feature',
      '5-day rolling-mean feature',
      'Chronological 80:20 split (no shuffling)',
      'StandardScaler + Linear Regression',
      'MSE, RMSE and R² evaluation',
    ],
    pipeline: [
      'Load 3,948 days',
      'Clean + parse dates',
      'Date & lag features',
      'Chronological split',
      'Scale + Linear Regression',
      'MSE / RMSE / R²',
    ],
    dataset: {
      name: 'Tesla (TSLA) daily stock prices (tsla.csv)',
      description:
        '3,948 trading days from 29 June 2010 to 10 March 2026, with date, open, high, low, close and volume.',
      source:
        'Downloaded from Kaggle. The values are Yahoo Finance daily prices (split-adjusted).',
      links: [
        {
          label: 'CSV on GitHub',
          href: 'https://github.com/its-aditisingh/tesla-stock-price-prediction/blob/main/tsla.csv',
          kind: 'other',
        },
      ],
    },
    techStack: [
      { label: 'AI / Data', items: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'] },
      { label: 'Tools', items: ['Jupyter Notebook', 'Pickle', 'Git', 'GitHub'] },
    ],
    screenshots: [],
    results: [
      'The notebook reports R² = 0.9986 (RMSE 3.50), but this is not a valid estimate: the 5-day moving-average feature includes the same day’s closing price — the value being predicted. This leakage is documented in the repository.',
      'Next step: build features from past values only and compare against a naive “yesterday’s close” baseline.',
      'Educational project — not financial advice.',
    ],
    futureScope: [
      'Leakage-free rolling features',
      'Time-series baselines (naive, ARIMA)',
      'Additional technical indicators',
      'Error analysis across market periods',
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/its-aditisingh/tesla-stock-price-prediction',
        kind: 'github',
      },
    ],
    featured: false,
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
    dataset: BRMH_DATASET,
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
    dataset: CANCER_VARIANT_DATASET,
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
];

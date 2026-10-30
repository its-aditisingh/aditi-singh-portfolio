import type { PaperNote, WorkingPaper } from '@/types';

// Source: docs/05-content/research.md

/** Aditi's own write-ups. PDFs are built from research/*.html with `npm run research:pdf`. */
export const workingPapers: WorkingPaper[] = [
  {
    slug: 'mind-scan-analyzer-methodology',
    title:
      'Mind Scan Analyzer: Classifying Psychiatric Disorder Groups from Resting-State EEG Features with a Browser-Deployed Random Forest',
    kind: 'Methodology note',
    date: '2026-10',
    pages: 2,
    abstract:
      'Documents the data (BRMH, 945 subjects, seven diagnostic groups), preprocessing, ANOVA feature selection, Random Forest model and in-browser deployment of my MCA final-year project, with its results — 98.41% accuracy and macro F1 0.98 on a 189-sample stratified test split, with per-class scores — and the known limitations.',
    topics: ['EEG', 'Random Forest', 'Feature selection', 'Model evaluation', 'Healthcare analytics'],
    fileUrl: '/research/mind-scan-analyzer-methodology.pdf',
    relatedProject: 'mind-scan-analyzer',
  },
];

/**
 * Short summaries of papers Aditi has read (PDFs supplied by her, 31 Oct 2026). Facts come from
 * the papers themselves; the "Reading notes" section is hidden when this list is empty.
 */
export const paperNotes: PaperNote[] = [
  {
    title:
      'Autism spectrum disorder diagnosis with EEG signals using time series maps of brain functional connectivity and a combined CNN–LSTM model',
    authors: 'Xu, Y., Yu, Z., Li, Y., Liu, Y., Li, Y., & Wang, Y.',
    venue: 'Computer Methods and Programs in Biomedicine, 250, 108196',
    year: 2024,
    url: 'https://doi.org/10.1016/j.cmpb.2024.108196',
    summary:
      'The authors turn 128-channel EEG from a public NDAR dataset (97 children with ASD, 92 typically developing) into time-series maps of brain functional connectivity and classify them with a combined CNN–LSTM, using DCGAN-generated samples to enlarge the training set. Splitting the data by individual rather than by signal segment, they report 81.08% accuracy at rest and 74.55% during a task.',
    takeaways: [
      'Split by subject, not by segment: slicing one person’s recording across train and test sets inflates accuracy — the paper argues earlier 92–96% results suffer from this.',
      'Connectivity between brain regions carries diagnostic signal — ASD differed in short-range parietal/occipital links and right temporoparietal-junction connections.',
      'Directly relevant to my Mind Scan Analyzer: subject-level splits and realistic evaluation matter as much as the model.',
    ],
  },
  {
    title: 'Explainable AI for Healthcare 5.0: Opportunities and Challenges',
    authors:
      'Saraswat, D., Bhattacharya, P., Verma, A., Prasad, V. K., Tanwar, S., Sharma, G., Bokoro, P. N., & Sharma, R.',
    venue: 'IEEE Access, 10',
    year: 2022,
    url: 'https://doi.org/10.1109/ACCESS.2022.3197671',
    summary:
      'A survey of explainable AI (XAI) for Healthcare 5.0 — patient-centric care built on real-time monitoring, IoT and 5G. It explains why clinical AI must be transparent and trustworthy, compares local and global explanation methods, proposes an XAI ensemble architecture for CT-image classification and segmentation, and presents an ECG-monitoring case study combining federated learning with XAI.',
    takeaways: [
      'In healthcare, a prediction is only useful if clinicians can see why it was made — accuracy alone does not earn trust.',
      'Local explanations (one patient) and global explanations (the whole model) answer different questions; both are needed.',
      'Federated learning lets hospitals train together without sharing raw patient data.',
    ],
  },
  {
    title: 'A Survey on Self-supervised Learning: Algorithms, Applications, and Future Trends',
    authors: 'Gui, J., Chen, T., Zhang, J., Cao, Q., Sun, Z., Luo, H., & Tao, D.',
    venue: 'arXiv preprint arXiv:2301.05712',
    year: 2023,
    url: 'https://arxiv.org/abs/2301.05712',
    summary:
      'Self-supervised learning (SSL) learns useful representations from unlabelled data by solving pretext tasks whose labels come from the data itself, then fine-tunes on a downstream task with few labels. The survey organises SSL methods into context-based, contrastive, generative and contrastive-generative families, reviews applications in computer vision and NLP, and lists open problems such as a unifying theory.',
    takeaways: [
      'Labels are the bottleneck — especially in medicine, where expert annotation is slow and costly; SSL reduces that dependence.',
      'Contrastive methods learn by pulling views of the same sample together and pushing different samples apart.',
      'A promising direction for EEG, where unlabelled recordings are plentiful but diagnoses are scarce.',
    ],
  },
];

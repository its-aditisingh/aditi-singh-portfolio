import type { CompareBlock, CompetencyGroup, LearningItem, SkillGroup } from '@/types';

// Source: docs/05-content/education-and-skills.md — items marked ✎ there were added during planning

export const skillGroups: SkillGroup[] = [
  {
    category: 'AI / ML',
    icon: 'Brain',
    skills: [
      'Python',
      'Scikit-Learn',
      'TensorFlow',
      'Pandas',
      'NumPy',
      'Machine Learning',
      'Feature Engineering',
      'Predictive Analytics',
    ],
  },
  { category: 'Programming', icon: 'Code2', skills: ['Python', 'Java', 'JavaScript'] },
  { category: 'Web', icon: 'Globe', skills: ['HTML', 'CSS', 'React', 'TypeScript', 'Flask'] },
  { category: 'Database', icon: 'Database', skills: ['MySQL', 'SQL'] },
  {
    category: 'BI & Tools',
    icon: 'BarChart3',
    skills: [
      'Power BI',
      'Power Query',
      'DAX',
      'Excel',
      'Git',
      'GitHub',
      'Google Colab',
      'Jupyter Notebook',
      'VS Code',
    ],
  },
  { category: 'Cloud', icon: 'Cloud', skills: ['AWS (332-hr program)', 'Cloud Computing'] },
];

export const currentlyLearning: LearningItem[] = [
  {
    topic: 'Advanced Machine Learning',
    note: 'Ensembles, pipelines, cross-validation and model tuning beyond the basics.',
    evidence: 'Kaggle Intermediate ML · Saylor CS207 (96%)',
    href: '/certificates/saylor-cs207-fundamentals-of-ml',
  },
  {
    topic: 'Neural Networks & Deep Learning',
    note: 'Building and training neural networks with Keras/TensorFlow.',
    evidence: 'Kaggle — Intro to Deep Learning',
    href: '/certificates/kaggle-intro-to-deep-learning',
  },
  {
    topic: 'Time Series Forecasting',
    note: 'Trend, seasonality and lag features for forecasting.',
    evidence: 'Kaggle — Time Series',
    href: '/certificates/kaggle-time-series',
  },
  {
    topic: 'Generative AI & LLMs',
    note: 'Prompt engineering and retrieval-augmented generation (RAG) fundamentals.',
  },
  {
    topic: 'Deploying ML models as APIs',
    note: 'Serving trained models with FastAPI and React front-ends.',
    evidence: 'Mind Scan Analyzer',
    href: '/projects/mind-scan-analyzer',
  },
  {
    topic: 'Outcome-Based Education (OBE)',
    note: 'Designing courses around measurable learning outcomes.',
  },
];

export const teachingCompetencies: CompetencyGroup[] = [
  {
    title: 'Programming',
    items: ['Python Programming', 'Programming Fundamentals', 'Data Structures'],
  },
  {
    title: 'Computer Science',
    items: ['Database Management System', 'Software Engineering', 'Web Technologies'],
  },
  {
    title: 'AI & Data Science',
    items: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Predictive Analysis'],
  },
  { title: 'Emerging Technologies', items: ['Cloud Computing'] },
];

export const researchInterests: string[] = [
  'Artificial Intelligence',
  'Machine Learning',
  'Healthcare Analytics',
  'Educational Technology',
  'Data Science',
  'Deep Learning / Neural Networks',
];

export const academicEngagements: string[] = [
  'Delivered technical seminars and project presentations on AI/ML topics.',
  'Participated in academic workshops and project demonstrations.',
  'Assisted peers in understanding programming and machine learning concepts.',
];

export const classroomVsIndustry: CompareBlock = {
  left: 'Classroom',
  right: 'Industry (internship)',
  rows: [
    ['Learn algorithms on clean textbook datasets', 'Preprocess messy real-world data'],
    [
      'Evaluate with a single accuracy number',
      'Choose metrics that fit the business decision',
    ],
    ['Code runs in a notebook', 'Python ML solutions with Scikit-Learn & Pandas for a team'],
    ['Results go in a report', 'Visualizations and reports drive decisions'],
  ],
};

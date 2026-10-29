# Content: Projects

Source: resume + GitHub repos, including the screenshots committed in each repo (fetched 29 Oct 2026). → `src/data/projects.ts`
Screenshots are downloaded to `assets-src/projects/` (git-ignored) and converted to WebP by `npm run images`.

---

## 01 · Mind Scan Analyzer  `slug: mind-scan-analyzer` · featured
| Field | Value |
|---|---|
| Tagline | EEG-based mental disorder prediction platform |
| Category | AI / ML |
| Context | MCA Final Year Project |
| App name (in UI) | NeuroScan — EEG AI Classifier |
| Summary | An AI-powered platform that classifies resting-state EEG features into seven mental-disorder categories with a Random Forest model — running entirely in the browser, with dashboards for performance, insights and the dataset. |
| Problem | EEG data is hard to interpret without specialised tools or expertise. |
| Solution | Upload an EEG feature CSV (BRMH schema) and get per-row disorder predictions instantly; the trained model is exported to the web app so inference runs locally in the browser. Performance, feature-importance and dataset views explain what the model does. |
| Features | Upload & Predict (CSV drop-zone, sample data, data preview) · Seven-class disorder classification · Model performance view (accuracy, F1, confusion matrix, per-class report) · Model insights (top-10 feature importance) · Dataset explorer (class distribution, feature schema) · Runs locally in the browser · Light/dark mode |
| Pipeline (from the repo's workflow diagram) | `Raw EEG Data` → `Data Cleaning` → `Feature Engineering` → `Model Processing` → `Prediction` → `Visualization & Reporting` |
| Dataset | BRMH (Bukhyun Research Mental Health) resting-state EEG — 945 patients · 1,149 EEG features · 7 disorder classes |
| Results (from the app's *Model performance* screen) | **98.41% accuracy** on 189 held-out samples (20% stratified split, `random_state=42`) · **Macro F1 0.98** · **Weighted F1 0.98** · Random Forest with **300 trees** using **10 features** selected from 1,149 · Presented during MCA final-year evaluation |
| Tech stack | **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui · **AI / Data:** Python, Scikit-learn (Random Forest), TensorFlow, NumPy, Pandas · **API:** FastAPI · **Tools:** Git, GitHub, VS Code |
| Future scope | Real-time EEG monitoring · More advanced ML models · User authentication & profiles · Cloud deployment · Wearable EEG integration · Exportable PDF reports · Advanced analytics dashboard · Mobile app |
| Links | Live: https://mind-scan-analyzer.lovable.app/ · GitHub: https://github.com/its-aditisingh/Mind-Scan-Analyzer |
| Cover | `MindScan-Analyzer-Homepage.png` |
| Gallery (order) | Homepage · Upload & Predict (`Prediction-Interface`) · Run prediction · Model performance · Model insights · Dataset · Project workflow diagram |
| Not used | `System_Architecture.png` — generic diagram showing CNN/LSTM and a "Relaxed 92.45%" output, which contradicts the real Random Forest, 7-class app (and has a typo in the title). Suggest Aditi update it in the repo too. |
| Cursor tour hotspots (on cover, % of width/height — placed beside each target, not on it) | 1 (41, 4) "Model loads and runs locally in the browser" · 2 (46, 27) "Random Forest · 300 trees" · 3 (20, 75) "Upload an EEG CSV to classify" · 4 (52, 75) "See accuracy, F1 and confusion matrix" |
| Before / After | Before: *Dataset* (raw EEG features & classes) · After: *Model performance* (98.41% accuracy) |

> Stack follows GitHub (decision 29 Oct 2026): README tech list + repo "About" line + what the committed screenshots show (Random Forest, in-browser inference).

---

## 02 · EEG Analysis Dashboard  `slug: eeg-analysis-dashboard`
| Field | Value |
|---|---|
| Tagline | Healthcare analytics dashboard for EEG data |
| Category | Data Analytics |
| Context | Power BI Dashboards Portfolio |
| Summary | A four-page Power BI report on 945 EEG patients across 7 disorder categories — patient overview, demographics, disorder analysis and EEG frequency-band signals. |
| Problem | Raw EEG datasets are difficult to explore and summarise for non-technical stakeholders. |
| Solution | Data cleaned and modelled in Power Query, measures built with DAX, and findings presented as interactive Power BI visuals with gender, age-range and disorder filters. |
| Features | KPI cards (945 patients · 7 disorders · avg age 30.6 · avg IQ 100.18) · Disorder & gender distribution · Age distribution · EEG frequency-band analysis (delta, theta, alpha, beta, gamma) · Gender / age / disorder filters |
| Pipeline | `EEG Dataset` → `Power Query (clean & shape)` → `Data Model` → `DAX Measures` → `Interactive Report` |
| Tech stack | Power BI, Power Query, DAX, Data Analytics, Data Visualization |
| Links | Live: https://eeg-analysis-dashboard.vercel.app · GitHub: https://github.com/its-aditisingh/PowerBI-Dashboards-Portfolio |
| Cover | `EEG-Patient-Overview.png` |
| Gallery | EEG Patient Overview · Demographic Overview · Disorder Analysis · EEG Signal Analysis |

---

## 03 · Cancer Variant Analysis Dashboard  `slug: cancer-variant-analysis-dashboard`
| Field | Value |
|---|---|
| Tagline | Prioritising cancer genetic variants for research |
| Category | Data Analytics |
| Context | Power BI Dashboards Portfolio |
| Report title (in UI) | Cancer Variant Prioritization Dashboard |
| Summary | A six-page Power BI report that prioritises ~10K cancer genetic variants across 20 genes by clinical significance, risk and predictive evidence. |
| Problem | Genetic variant data is large and hard to interpret for clinical significance and risk. |
| Solution | An interactive Power BI report that breaks variants down by clinical significance, variant type, gene and chromosome, with risk-assessment and predictive-evidence views. |
| Features | KPI cards (10K variants · 20 genes · mean CADD 19.93 · 2K pathogenic · 3K likely pathogenic) · Clinical-significance distribution · Variant-type distribution · Gene & chromosome analysis · Variant risk assessment · Predictive evidence · Research discovery · Gene / chromosome / significance filters |
| Pipeline | `Variant Dataset` → `Power Query` → `Data Model` → `DAX Measures` → `Insights Report` |
| Tech stack | Power BI, Power Query, DAX, Data Analytics, Data Visualization |
| Links | GitHub: https://github.com/its-aditisingh/PowerBI-Dashboards-Portfolio (folder `Cancer-Variant-Analysis-Dashboard`) |
| Cover | `Executive-overview-dashboard.png` |
| Gallery | Executive Overview · Clinical Significance Deep-dive · Gene & Chromosome Analysis · Variant Risk Assessment · Predictive Evidence · Research Discovery |

---

## 04 · Predictive Analytics & ML Models (Internship)  `slug: shanti-infosoft-ml-internship-work` ✎
Built only from the resume's internship bullets — no invented client names, datasets or metrics. Company work is usually confidential, so there are no code/demo links.

| Field | Value |
|---|---|
| Tagline | Industry machine-learning work at a CMMI Level 5 company |
| Category | AI / ML |
| Context | AI/ML Internship · Shanti Infosoft LLP, Indore |
| Period | Jan 2026 – Jun 2026 |
| Summary | Python-based machine learning models and predictive analytics developed during an industry-immersion internship, from data preparation to decision-ready reports. |
| Problem | Raw business data has to become reliable predictions and clear reports before it can support decisions. |
| Solution | Preprocessed data, engineered features, built and evaluated Scikit-Learn models, and turned the results into visualizations and analytical reports. |
| Features | Data preprocessing · Feature engineering · Model development · Model evaluation · Visual analytics & reporting |
| Pipeline | `Raw Data` → `Preprocessing` → `Feature Engineering` → `Model Training` → `Evaluation` → `Reports & Visuals` |
| Tech stack | Python, Scikit-Learn, Pandas, NumPy |
| Cover | No screenshot → generated cover: accent gradient + pipeline icons (lucide `Database → Wand2 → Brain → ChartLine`) |
| Links | Internal link to Experience entry `/experience/shanti-infosoft-ai-ml-intern` |
| Note on page | "Details of client work are confidential." |

---

## Wanted (later)
- Real internship project name / screenshots (if shareable).
- Any BCA / MCA mini-projects with GitHub links.

# Content: Projects

Source: the GitHub repos (README, code, committed screenshots), fetched 29–31 Oct 2026. → `src/data/projects.ts` (the source of truth for exact wording).
Screenshots are downloaded to `assets-src/projects/` (git-ignored) and converted to WebP by `npm run images`.

**Rule (owner, 31 Oct):** every project must state its **dataset / data source** (`dataset` field — name, description, source, citation, links). The data tests enforce it.

Order: Mind Scan Analyzer (featured) · Cancer Variant Prioritization (ML) · Tesla Stock Price Prediction · EEG Analysis Dashboard · Cancer Variant Analysis Dashboard.

---

## 01 · Mind Scan Analyzer  `mind-scan-analyzer` · featured · AI / ML
| Field | Value |
|---|---|
| Context | MCA Final Year Project · app name "NeuroScan — EEG AI Classifier" |
| Method (from `scripts/export_model.py`) | drop `no.`, `eeg.date`, `specific.disorder` → median / mode imputation + label encoding → StandardScaler → stratified 80/20 split (`random_state=42`) → `SelectKBest(f_classif, k=10)` fitted on train → RandomForest (300 trees, `class_weight="balanced"`) → JSON export → TypeScript `predict_proba` in the browser |
| Dataset | **BRMH resting-state EEG** — 945 subjects (850 patients, 95 healthy controls), 1,149 columns (demographics + absolute band power and coherence). Park et al. (2021), *Frontiers in Psychiatry* 12:707581, doi 10.3389/fpsyt.2021.707581; public copy: kaggle.com/datasets/shashwatwork/eeg-psychiatric-disorders-dataset |
| Class distribution | Mood 266 · Addictive 186 · Trauma/stress 128 · Schizophrenia 117 · Anxiety 107 · Healthy 95 · OCD 46 (from the EEG dashboard) |
| Metrics shown | Dataset facts only: 945 subjects · 7 groups · 1,149 columns · 10 selected features |
| Metrics (restored, revision 2) | 98.41% accuracy on 189 held-out samples · macro F1 0.98 · 300 trees · 10 / 1,149 features. **Owner confirmed (31 Oct) these are the real results, demonstrated in the MCA viva.** Note: the repo's bundled `src/model/model.json` still carries a *"demo model trained on synthetic EEG-shaped data"* note and 60 trees — Aditi should re-export the real model so the repo matches. |
| Write-up | 2-page methodology note on the Research page (`research/mind-scan-analyzer-methodology.html` → PDF) |
| Links | Live: mind-scan-analyzer.lovable.app · GitHub: its-aditisingh/Mind-Scan-Analyzer |

## 02 · Cancer Variant Prioritization (ML)  `cancer-variant-prioritization-ml` · AI / ML  (new, 31 Oct)
| Field | Value |
|---|---|
| Repo | github.com/its-aditisingh/cancer-variant-prioritization-ml |
| Method | mean/mode imputation → StandardScaler + OneHotEncoder (ColumnTransformer) → 80:20 split → RandomForest (200 trees, depth 10, rs 42) → accuracy, confusion matrix, P/R/F1 → feature importance → Pickle |
| Dataset | `cancer_variant_prioritization_dataset.csv` in the repo — 10,000 variants × 9 columns (chromosome, position, gene, variant type, population AF, CADD, SIFT, PolyPhen, clinical significance). **Source: Kaggle** — [Cancer Variant Dataset for Machine Learning](https://www.kaggle.com/datasets/punithpunk/cancer-variant-dataset-for-machine-learning) by Punith Punk, CC0; publisher describes it as synthetic. Verified: same file name and identical size (773,438 bytes). Also used by the Cancer Variant Analysis Dashboard. |
| Results | No figures (README: report only after verification). Not for clinical use. |

## 03 · Tesla Stock Price Prediction  `tesla-stock-price-prediction` · AI / ML  (new, 31 Oct)
| Field | Value |
|---|---|
| Repo | github.com/its-aditisingh/tesla-stock-price-prediction |
| Method | missing values + date parsing → year/month/day, `Prev_Close`, 5-day rolling mean → chronological 80:20 split → StandardScaler → Linear Regression → MSE / RMSE / R² |
| Dataset | `tsla.csv` in the repo — 3,948 trading days, 29 Jun 2010 – 10 Mar 2026, OHLC + volume. **Source: Kaggle** (owner). Values are Yahoo Finance split-adjusted prices; no Kaggle file matched byte-for-byte, so the exact Kaggle page is still to be confirmed (Q15) — until then only the GitHub CSV is linked. |
| Results | Notebook reports R² 0.9986 / RMSE 3.50 but the README itself flags **target leakage** (`MA_5` includes the same day's close). Shown as a lesson, not an achievement. |

## 04 · EEG Analysis Dashboard  `eeg-analysis-dashboard` · Data Analytics
Power BI, 4 pages; 945 patients, 7 disorders, avg age 30.6, avg IQ 100.18. **Dataset: BRMH** (same as Mind Scan — inferred from identical counts; confirm, Q16). Live: eeg-analysis-dashboard.vercel.app.

## 05 · Cancer Variant Analysis Dashboard  `cancer-variant-analysis-dashboard` · Data Analytics
Power BI, 6 pages; 10K variants, 20 genes, mean CADD 19.93. **Dataset: same CSV as project 02.**

---

## Removed (31 Oct 2026)
- `shanti-infosoft-ml-internship-work` — generic internship write-up; replaced by the two GitHub ML projects (owner request). The internship stays under Experience.
- `System_Architecture.png` (Mind Scan) — still excluded: shows CNN/LSTM, contradicts the real model.

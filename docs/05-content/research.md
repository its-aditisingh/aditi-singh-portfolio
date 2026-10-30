# Content: Research (new, 31 Oct 2026)

→ `src/data/research.ts`, page `/research` (spec: [08-research](../03-features/08-research.md)).

## Research interests
Same list as About (`researchInterests` in `src/data/skills.ts`): Artificial Intelligence · Machine Learning · Healthcare Analytics · Educational Technology · Data Science · Deep Learning / Neural Networks. Also shown in the Home hero above the buttons.

## Write-ups (Aditi's own work)
| slug | Title | Kind | Pages | File | Source |
|---|---|---|---|---|---|
| `mind-scan-analyzer-methodology` | Mind Scan Analyzer: Classifying Psychiatric Disorder Groups from Resting-State EEG Features with a Browser-Deployed Random Forest | Methodology note | 2 | `public/research/mind-scan-analyzer-methodology.pdf` | `research/mind-scan-analyzer-methodology.html` → `npm run research:pdf` |

Contents: objective · data (Park et al. 2021; Table 1 class distribution) · pipeline (from `export_model.py`) · browser deployment · **results** (98.41% accuracy, macro F1 0.98 on 189 held-out subjects; Table 2 per-class precision/recall/F1 — owner-confirmed, viva-demonstrated; Park et al. binary accuracies ~74.5–93.8% given as context) · limitations (preprocessing leakage, single split → CV + baselines next, imbalance, single dataset, ethics) · reproducibility · references (Park 2021, Kaggle, Breiman 2001, Pedregosa 2011).

⚠ Drafted from the repository; **Aditi should read it before using it in applications** — it is written in her name.

## Reading notes (paper summaries)
Written from the three PDFs Aditi supplied (`Certificate/`, 31 Oct 2026); facts from the papers only. Section is hidden if `paperNotes` is ever empty.

| Paper | Venue | Link |
|---|---|---|
| Xu et al. — ASD diagnosis with EEG using time-series maps of brain functional connectivity and CNN–LSTM | Computer Methods and Programs in Biomedicine 250, 108196 (2024) | doi.org/10.1016/j.cmpb.2024.108196 |
| Saraswat et al. — Explainable AI for Healthcare 5.0: Opportunities and Challenges | IEEE Access 10 (2022) | doi.org/10.1109/ACCESS.2022.3197671 |
| Gui et al. — A Survey on Self-supervised Learning: Algorithms, Applications, and Future Trends | arXiv:2301.05712 (2023) | arxiv.org/abs/2301.05712 |

✎ Summaries and takeaways are drafted in Aditi's voice — she should read and adjust them.

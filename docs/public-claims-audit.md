# Public Claims Accuracy Audit — Peter van Beek Portfolio

This document provides a claim-by-claim audit of all public statements on the Peter van Beek portfolio website against confirmed sources:
1. `20260727 Peter Van Beek.pdf` (Confirmed Résumé)
2. User interview confirmations
3. Traceable public repositories and patent records (`ad-rss-lib`, US Patent Office)

---

## Audit Table

| Public Claim | Current Page / Section | Supporting Source | Status | Required Correction / Action Taken |
| :--- | :--- | :--- | :--- | :--- |
| **Name & Identity** | Header / Hero / Footer | Résumé | **Confirmed** | Capitalization preserved as **Peter van Beek** (lowercase "van"). |
| **Ph.D. & M.Sc.Eng.** | Education / Timeline | Résumé | **Confirmed** | Electrical and Computer Engineering, Delft University of Technology. |
| **2012 US Frontiers of Engineering** | Education / Timeline | Résumé | **Confirmed** | Alumnus, US Frontiers of Engineering Symposium (National Academy of Engineering). |
| **Rivian Senior Staff AI Engineer (2025–2026)** | Experience / Work | Résumé | **Confirmed** | Dates (Apr 2025 – Mar 2026), role, speech AI model inference & camera security vision confirmed. |
| **Intel Senior AI Algorithm Engineer (2019–2024)** | Experience / Work | Résumé | **Confirmed** | Semantic segmentation, depth estimation, super-resolution, HW specs, model profiling & quantization tools. |
| **Intel & Mobileye Technical Lead (2017–2019)** | Experience / Work | Résumé & GitHub | **Confirmed** | Open-source C++ RSS library (`ad-rss-lib`), scenario safety KPIs, sensor data compression. |
| **Sharp Labs Tech Lead Manager & Principal Researcher (1998–2016)** | Experience / Work | Résumé | **Confirmed** | Mobile robots, automated inspection, 4K/8K/HDR TV, security cameras, team leadership, tech transfer, MPEG co-editor. |
| **PyTorch** | Expertise Grid / Work | None (Unconfirmed) | **Needs Peter Confirmation** | Removed from previous employment claims. Placed under Demo implementation only. |
| **ONNX Runtime (Prior Experience)** | Expertise Grid / Work | None (Unconfirmed) | **Needs Peter Confirmation** | Removed from prior employment claims. Used exclusively in the live Edge Vision Inference Lab demo (`onnxruntime-web`). |
| **TensorRT** | Expertise Grid / Work | None (Unconfirmed) | **Needs Peter Confirmation** | Removed from previous employment claims. |
| **OpenVINO** | Expertise Grid / Work | None (Unconfirmed) | **Needs Peter Confirmation** | Removed from previous employment claims. |
| **TVM** | Expertise Grid / Work | None (Unconfirmed) | **Needs Peter Confirmation** | Removed from previous employment claims. |
| **INT8 / FP16 / FP8** | Expertise Grid / Work | Résumé ("Quantization") | **Corrected** | Standardized to "Model Profiling and Quantization" as confirmed in résumé. Removed unconfirmed FP8/INT8 specific claims. |
| **Structured Pruning** | Work (Rivian) | None (Unconfirmed) | **Removed** | Removed from employment claims. |
| **Graph Rewriting** | Work (Rivian) | None (Unconfirmed) | **Removed** | Removed from employment claims. |
| **Streaming C++ Inference Wrappers** | Work (Rivian) | None (Unconfirmed) | **Rewritten** | Rewritten to "Streamlined model inference runtime integration". |
| **CUDA** | Expertise Grid | None (Unconfirmed) | **Removed** | Removed from employment claims. |
| **TensorFlow** | Expertise Grid | None (Unconfirmed) | **Removed** | Removed from employment claims. |
| **OpenCV** | Expertise Grid | None (Unconfirmed) | **Removed** | Removed from employment claims. |
| **C++14 / C++17 / C++20** | Expertise Grid | Résumé ("C++") | **Corrected** | Simplified to "C++" as stated on confirmed résumé. |
| **C** | Expertise Grid | Résumé ("C++") | **Corrected** | Simplified to "C++" as stated on confirmed résumé. |
| **GTest** | Expertise Grid | None (Unconfirmed) | **Removed** | Removed from employment claims. |
| **MAC-Array Mapping** | Work (Intel) | Résumé ("HW specs") | **Corrected** | Restrained to "Functional specifications for deep-learning inference accelerator hardware". |
| **TOPS/Watt Optimization** | Work (Intel) | None (Unconfirmed) | **Removed** | Removed from employment claims. |
| **Automotive SoC Thermal / Memory Specs** | Work (Rivian) | Confidential | **Restrained** | Kept strictly qualitative to protect confidentiality. No unconfirmed numbers published. |
| **Sharp "Flagship Product" Claims** | Work (Sharp) | Résumé | **Corrected** | Restrained to "Technology transfers to Sharp business groups" as stated on résumé. |
| **Remote-Work / Office Locations** | Experience Timeline | Résumé | **Confirmed** | Palo Alto CA, Hillsboro OR, Camas WA, Rochester NY, Delft Netherlands. |
| **Target Companies (NVIDIA, ASML, Tesla)** | Hero / Positioning | User Interview | **Contextualized** | Stated strictly as target role contexts in portfolio positioning, not as past employment experience. |
| **Patent US8934728B2** | Publications | US Patent Record | **Confirmed** | Super-resolution upscaling for display devices (Sharp Labs). |
| **Patent US10891494B2** | Publications | US Patent Record | **Confirmed** | Image-based compression of LIDAR sensor data (Intel/Mobileye). |
| **Publication Links** | Research Section | Web Records | **Corrected** | Removed generic LinkedIn links used as publication URLs. Linked `ad-rss-lib` directly to verified GitHub repository; omitted unverified external links. |
| **"Verified Proof" Labels** | Expertise Section | Audit | **Corrected** | Removed the word "Verified" from general cards unless accompanied by a traceable public link (e.g. `ad-rss-lib`). Replaced with "Confirmed Area". |

---

## Key Governance Rules Enforced

1. **Demo Technologies vs. Work Experience:**  
   Technologies used to build the interactive portfolio demonstration (such as `onnxruntime-web`, WebGPU, WASM, SqueezeNet 1.0) are explicitly categorized under **Live Browser Demonstration**, and are never claimed as Peter's prior employment experience.

2. **No Unbacked Superlatives:**  
   All claims of metrics, specific frameworks, hardware microarchitecture numbers, or proprietary code names not explicitly present in `20260727 Peter Van Beek.pdf` have been removed or rewritten qualitatively.

3. **Traceable Public Links:**  
   Only public items with traceable records (e.g. `https://intel.github.io/ad-rss-lib/`) retain external links. Placeholder or generic social profile links have been removed from publication listings.

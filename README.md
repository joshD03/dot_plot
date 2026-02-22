# MediVisual

A full-stack diagnostic tool for visualising breast cancer lesions on 2D patient models, built during a four-week internship at Dotplot, a MedTech startup developing a handheld ultrasonic device for early-onset breast cancer detection.

***

![Visualisation](https://github.com/joshD03/dot_plot/blob/main/MediVisual3.png?raw=true)
*2D lesion visualisation. Clinicians can mark, track, and compare lesion positions across visits.*

***

## Summary

* **Goal:** give NHS clinicians a way to store patient data and visualise breast lesion locations from ultrasonic sensor output
* **Stack:** React, FastAPI, MongoDB, Docker
* **Delivery:** working MVP in 4 weeks, demonstrated to 50+ oncologists at the end of the programme
* **Context:** built as part of the Dotplot x Tech Academia accelerator

***

## Motivation

Dotplot is building a handheld device that uses piezoelectric micromachined ultrasonic transducers (PMUTs) to detect breast tissue anomalies. The hardware existed, but there was no clinical interface for storing patient records or visualising where lesions appeared on a patient's body.

The brief was straightforward: build a tool that lets a clinician log a patient, record scan results, and see lesion positions mapped onto a simple anatomical model, so that changes over time are visible at a glance.

I wanted to understand how a diagnostic tool moves from prototype to something a clinician would actually trust. That meant dealing with:

* Data modelling for longitudinal patient records (multiple visits, multiple scans per visit)
* Mapping raw sensor coordinates onto a 2D body model in a way that was intuitive for non-technical users
* Making the interface fast enough that a clinician would not revert to paper

***

## What I built

### Frontend

React with TailwindCSS. The interface has three main views:

1. **Patient list** with search and filtering.
2. **Patient detail page** showing demographics, scan history, and a timeline of visits.
3. **2D visualisation panel** where lesion positions are plotted on an anatomical model. Clinicians can add, edit, and remove markers.

### Backend

FastAPI (Python) serving a REST API, with MongoDB as the data store.

* **Patient records** support create, read, update, and delete operations with validation.
* **Scan data** is stored as nested documents linked to patient visits, using MongoDB's document model to keep related data together.
* **Aggregation pipelines** calculate lesion growth trends across visits and flag cases that meet follow-up thresholds.

### Deployment

Containerised with Docker. The frontend and backend run as separate services, which made it straightforward to develop and test independently.

***

## Screenshots

**Patient management view**

![Patient Details](https://github.com/joshD03/dot_plot/blob/main/MediVisual2.png?raw=true)
*CRUD interface for patient records. Designed for speed: clinicians need to find a patient and open their history in seconds.*

**Login**

![Login](https://github.com/joshD03/dot_plot/blob/main/MediVisual1.png?raw=true)

***

## What I learned

**Four weeks is tight.** Scoping was the hardest part. I had to cut features (role-based access control, PDF export of scan reports) to deliver a working product on time. Learning to say "not this sprint" was more valuable than any technical skill.

**Clinicians do not think like engineers.** The first version of the visualisation panel used a coordinate grid. The oncologists who reviewed it wanted anatomical landmarks and a body outline. The final version reflects their feedback, not my initial design.

**MongoDB was the right choice for this shape of data.** Patient records with nested, variable-length scan histories fit naturally into a document model. A relational schema would have required more joins for the same queries.

**I underestimated how much time goes into making a UI feel trustworthy.** Loading states, confirmation dialogs, clear error messages. These are not technically interesting, but clinicians will not use a tool that feels fragile.

***

## Limitations

* **No authentication beyond a basic login.** A real clinical tool would need NHS-compliant identity management and audit logging. This was descoped due to time.
* **The 2D model is a simplification.** Mapping 3D ultrasound data onto a 2D outline loses depth information. A future version would need a 3D viewer or at least a layered depth indicator.
* **No automated alerting in production.** The aggregation pipeline flags cases for follow-up, but there is no notification system. A clinician would have to check the dashboard manually.
* **Performance was not stress-tested.** The demo ran on a small dataset. I did not benchmark how the interface behaves with hundreds of patients and thousands of scans.

***

## Repository structure

```text
README.md
front-end/
  src/
    components/
    pages/
    services/
  package.json
back-end/
  app/
    api/
    core/
    models/
  requirements.txt
docker-compose.yml
.env.example
```

***

## Setup

### Prerequisites

* Python 3.7+
* Node.js 14+
* MongoDB (local or Atlas)
* Docker (optional, for containerised deployment)

### Running locally

**Backend:**

```bash
cd back-end
pip install -r requirements.txt
python app/main.py
```

**Frontend:**

```bash
cd front-end
npm install
npm start
```

### Environment variables

Create a `.env` file in the root directory:

```env
PORT_NUMBER=3000
DATABASE_URL=mongodb://localhost:27017
CONNECTION_STRING=your_mongodb_connection_string
```

***

## License

MIT.

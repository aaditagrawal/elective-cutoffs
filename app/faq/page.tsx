"use client";

import { classNames } from "@/ui.stylex";

import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    id: "difficulty",
    question: "What does 'Allocation Difficulty' mean?",
    answer:
      'The "allocation difficulty" rating indicates how competitive or challenging it is to get allocated into a subject based on historical allocation data. It reflects the difficulty of the allocation process itself, not the academic difficulty of the subject material. A higher allocation difficulty means fewer students typically get into the course relative to demand.',
  },
  {
    id: "allocation",
    question: "How does the allocation process work?",
    answer:
      "Students submit their subject preferences in ranked order. Allocation uses CGPA and the available capacity in each class, with higher-CGPA students receiving priority. If a student's highest available preference is full, allocation proceeds to the next preference. The cutoffs shown here are reconstructed from the supplied VII semester allocation and CGPA records.",
  },
];

export default function FAQPage() {
  return (
    <div className={classNames.home0}>
      <div className={classNames.home1}>
        <h1 className={classNames.home2}>FAQ</h1>
        <p className={classNames.home3}>
          Frequently asked questions about the elective allocation system.
        </p>

        <div className={classNames.home4}>
          {faqs.map((faq) => (
            <Card key={faq.id} className={classNames.home5}>
              <CardContent className={classNames.home6}>
                <h2 className={classNames.home7}>{faq.question}</h2>
                <p className={classNames.home8}>{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

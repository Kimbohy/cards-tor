import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quelle est la durée de livraison ?",
    answer:
      "Nous expédions sous 24-48h. La livraison prend généralement 3-5 jours ouvrés en France métropolitaine.",
  },
  {
    question: "Les cartes sont-elles originales ?",
    answer:
      "Oui, toutes nos cartes sont des créations originales. Chaque deck est fabriqué sur commande pour garantir la fraîcheur.",
  },
  {
    question: "Le stock est-il limité ?",
    answer:
      "Certaines éditions sont limitées. Nous indiquons clairement la disponibilité sur chaque fiche produit.",
  },
  {
    question: "Pour qui sont ces cartes ?",
    answer:
      "Nos decks conviennent aux joueurs de cartes, magiciens, collectionneurs et amateurs de belles cartes.",
  },
  {
    question: "Comment entretenir les cartes ?",
    answer:
      "Conservez-les dans leur boîte, à l'abri de l'humidité et de la lumière directe. Nettoyez avec un chiffon microfibre.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-primary">
            Questions Fréquentes
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-6">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-8 py-4 hover:border-primary transition-all duration-300 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-left text-lg font-serif text-foreground hover:text-primary transition-colors duration-300 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-4 text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

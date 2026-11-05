import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

test("class composition keeps nested conditionals and drops false values", () => {
  assert.equal(
    cn("rounded", [null, ["block", false, undefined]], {
      visible: true,
      hidden: false,
      truncate: "",
      count: 2,
    }),
    "rounded block visible count",
  );
  assert.equal(cn(null, undefined, false, true, "", 0, NaN, BigInt(0), BigInt(1)), "");
  assert.equal(cn(1, -2, [3, false]), "1 -2 3");
});

test("class maps preserve enumerable key order, including inherited conditions", () => {
  const conditions = { visible: true, disabled: 0 };
  Object.setPrototypeOf(conditions, { inherited: true });
  assert.equal(cn(conditions), "visible inherited");
});

test("class composition retains Tailwind overrides used by cards and filters", () => {
  assert.equal(cn("grid gap-1 px-6", ["flex", { "gap-4": true }]), "px-6 flex gap-4");
  assert.equal(cn("w-fit h-9", "w-full"), "h-9 w-full");
  assert.equal(cn(" px-2\ttext-xs\n", "px-4"), "text-xs px-4");
  assert.equal(
    cn("hover:bg-muted dark:bg-card", "hover:bg-accent"),
    "dark:bg-card hover:bg-accent",
  );
});

test("badges keep defaults, null variants, slot attributes and content", () => {
  const defaultMarkup = renderToStaticMarkup(createElement(Badge, {}, "OE"));
  assert.match(defaultMarkup, /^<span data-slot="badge" data-variant="default"/);
  assert.match(defaultMarkup, /bg-primary text-primary-foreground/);
  assert.match(defaultMarkup, />OE<\/span>$/);
  const unstyled = renderToStaticMarkup(createElement(Badge, { variant: null }, "PE"));
  assert.doesNotMatch(unstyled, /data-variant|bg-primary/);
  assert.equal(badgeVariants(), badgeVariants({ variant: "default" }));
});

test("badge variants retain their semantic classes and caller overrides", () => {
  const variants = [
    ["secondary", "bg-secondary"],
    ["destructive", "text-destructive"],
    ["outline", "border-border"],
    ["ghost", "hover:bg-muted"],
    ["link", "underline-offset-4"],
  ] satisfies [NonNullable<Parameters<typeof Badge>[0]["variant"]>, string][];
  for (const [variant, className] of variants) {
    assert.ok(badgeVariants({ variant }).split(" ").includes(className));
    const markup = renderToStaticMarkup(createElement(Badge, { variant, className: "px-4" }, "OE"));
    assert.match(markup, new RegExp(`data-variant="${variant}"`));
    assert.match(markup, /\bpx-4\b/);
    assert.doesNotMatch(markup, /\bpx-2\b/);
  }
});

test("badge composition keeps anchor semantics and child attributes", () => {
  const markup = renderToStaticMarkup(
    createElement(
      Badge,
      { asChild: true, variant: "outline", "aria-label": "Course details" },
      createElement("a", { href: "/course", target: "_blank", rel: "noreferrer" }, "Details"),
    ),
  );
  assert.match(markup, /^<a /);
  assert.match(markup, /data-slot="badge"/);
  assert.match(markup, /aria-label="Course details"/);
  assert.match(markup, /href="\/course"/);
  assert.match(markup, />Details<\/a>$/);
});

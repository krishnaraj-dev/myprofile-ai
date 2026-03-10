import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SkillBadge } from "../src/components/SkillBadge";

describe("SkillBadge", () => {
  it("renders the skill name", () => {
    render(<SkillBadge skill="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });
});

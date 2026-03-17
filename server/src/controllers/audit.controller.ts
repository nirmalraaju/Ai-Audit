import { Request, Response } from 'express';
import { runAxeAudit } from '../services/axe.service';
import { getA11yFix } from '../services/gemini.service';

export const performAudit = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    console.log(`🔍 Starting audit for: ${url}`);
    const violations = await runAxeAudit(url);
    
    console.log(`🤖 Found ${violations.length} violations. Generating AI fixes...`);
    
    const results = await Promise.all(
      violations.map(async (violation) => {
        const fix = await getA11yFix(violation);
        return {
          id: violation.id,
          impact: violation.impact,
          description: violation.description,
          help: violation.help,
          nodes: violation.nodes.map((n: any) => n.html),
          suggestedFix: fix
        };
      })
    );

    res.json({
      url,
      totalViolations: violations.length,
      results
    });
  } catch (error: any) {
    console.error('Audit failed:', error);
    res.status(500).json({ error: 'Failed to perform audit', details: error.message });
  }
};

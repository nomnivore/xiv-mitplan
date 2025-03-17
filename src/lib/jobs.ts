import { z } from 'zod';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

// Define the Action schema
const ActionSchema = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  cooldown: z.number().optional(),
  charges: z.number().default(1),
  duration: z.number().optional(),
  replace: z.string().optional()
});

// TODO: collapse roles into jobs

// Define the Role schema
const RoleSchema = z.object({
  name: z.string(),
  code: z.string(),
  transient: z.boolean(),
  actions: z.array(ActionSchema).optional()
});

// Define the Job schema
const JobSchema = z.object({
  name: z.string(),
  role: z.string(),
  code: z.string(),
  actions: z.array(ActionSchema)
});

// Define the main schema
const JobsSchema = z.object({
  jobs: z.array(JobSchema),
  roles: z.array(RoleSchema)
});

// Read and parse the YAML file
const filePath = path.join(process.cwd(), "public", "data", "jobs.yaml");
const yamlContent = fs.readFileSync(filePath, 'utf-8');
const data = yaml.load(yamlContent);

// Validate the data
const parsedData = JobsSchema.parse(data);
const selectableRoles: Array<z.infer<typeof RoleSchema> | z.infer<typeof JobSchema>> = [...parsedData.roles.filter((role) => role.transient), ...parsedData.jobs];
const jobData = { selectableRoles, ...parsedData };
export { jobData }
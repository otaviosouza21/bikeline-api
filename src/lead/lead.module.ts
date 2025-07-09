// src/lead/lead.module.ts
import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { PrismaModule } from 'src/db/prisma.module'; // caminho ajustado

@Module({
  imports: [PrismaModule],
  controllers: [LeadController],
  providers: [LeadService],
})
export class LeadModule {}

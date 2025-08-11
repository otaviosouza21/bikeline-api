import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class LeadService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLeadDto) {
    const data: Prisma.LeadCreateInput = {
      nome: dto.nome,
      email: dto.email,
      telefone: dto.telefone,
      dt_nascimento: dto.dt_nascimento,
    };

    return this.prisma.lead.create({
      data,
      select: {
        nome: true,
        email: true,
        telefone: true,
        dt_nascimento: true,
      },
    });
  }
  findAll() {
    return this.prisma.lead.findMany();
  }

  findOne(id: number) {
    return this.prisma.lead.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateLeadDto) {
    return this.prisma.lead.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.lead.delete({ where: { id } });
  }
}

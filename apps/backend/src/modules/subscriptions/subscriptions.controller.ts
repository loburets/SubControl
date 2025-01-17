import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { SubscriptionsService } from './subscriptions.service';
import {
  SubscriptionListResponseDto,
  SubscriptionResponseDto,
  SubscriptionRequestDto,
} from '@subcontrol/shared-dtos/subscriptions';
import { transformToResponseDto } from '../../utils/transformer';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiResponse({
    status: 200,
    description: 'The subscription has been successfully created.',
    type: SubscriptionResponseDto,
  })
  @ApiBearerAuth('jwt')
  async create(@Body() createSubscriptionDto: SubscriptionRequestDto) {
    const subscription = await this.subscriptionsService.create(
      createSubscriptionDto
    );
    return transformToResponseDto(subscription, SubscriptionResponseDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a list of subscriptions' })
  @ApiResponse({
    status: 200,
    description: 'The list of subscriptions has been successfully retrieved.',
    type: SubscriptionListResponseDto,
  })
  @ApiBearerAuth('jwt')
  async findAll(@Req() req: Request & { user: { id: number } }) {
    const subscriptions = await this.subscriptionsService.findAll({
      userId: req.user.id,
    });

    return {
      subscriptions: subscriptions.map((s) =>
        transformToResponseDto(s, SubscriptionResponseDto)
      ),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: SubscriptionRequestDto
  ) {
    return this.subscriptionsService.update(+id, updateSubscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(+id);
  }
}

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
  ParseIntPipe,
} from '@nestjs/common';
import { Request } from 'express';

import { SubscriptionsService } from './subscriptions.service';
import {
  SubscriptionListResponseDto,
  SubscriptionResponseDto,
  SubscriptionRequestDto,
  SubscriptionStatsResponseDto,
} from '@subcontrol/shared-dtos/subscriptions';
import {
  transformToResponseDto,
  transformToSubscriptionResponseDto,
} from '../../utils/transformer';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getSubscriptionsStat } from './subscriptions.calculator';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get statistic data of the subscriptions' })
  @ApiResponse({
    status: 200,
    description: 'The statistic has been successfully retrieved.',
    type: SubscriptionStatsResponseDto,
  })
  @ApiBearerAuth('jwt')
  async stats(
    @Req() req: Request & { user: { id: number } }
  ): Promise<SubscriptionStatsResponseDto> {
    const subscriptions = await this.subscriptionsService.findAll({
      userId: req.user.id,
    });

    return transformToResponseDto(
      getSubscriptionsStat(subscriptions),
      SubscriptionStatsResponseDto
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiResponse({
    status: 200,
    description: 'The subscription has been successfully created.',
    type: SubscriptionResponseDto,
  })
  @ApiBearerAuth('jwt')
  async create(
    @Req() req: Request & { user: { id: number } },
    @Body() createSubscriptionDto: SubscriptionRequestDto
  ) {
    const subscription = await this.subscriptionsService.create(
      req.user.id,
      createSubscriptionDto
    );
    return transformToSubscriptionResponseDto(subscription);
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
        transformToSubscriptionResponseDto(s)
      ),
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a subscription by ID' })
  @ApiResponse({
    status: 200,
    description: 'The subscription has been successfully retrieved.',
    type: SubscriptionResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Subscription not found.',
  })
  @ApiBearerAuth('jwt')
  async findOne(
    @Req() req: Request & { user: { id: number } },
    @Param('id', ParseIntPipe) id: string
  ) {
    const subscription =
      await this.subscriptionsService.checkSubscriptionCanBeRetrievedForUser(
        +id,
        req.user.id
      );

    return transformToSubscriptionResponseDto(subscription);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a subscription by ID' })
  @ApiResponse({
    status: 200,
    description: 'The subscription has been successfully updated.',
    type: SubscriptionResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Subscription not found.',
  })
  @ApiBearerAuth('jwt')
  async update(
    @Req() req: Request & { user: { id: number } },
    @Param('id', ParseIntPipe) id: string,
    @Body() updateSubscriptionDto: SubscriptionRequestDto
  ) {
    await this.subscriptionsService.checkSubscriptionCanBeRetrievedForUser(
      +id,
      req.user.id
    );

    const subscription = await this.subscriptionsService.update(
      +id,
      updateSubscriptionDto
    );

    return transformToSubscriptionResponseDto(subscription);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a subscription by ID' })
  @ApiResponse({
    status: 200,
    description: 'The subscription has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Subscription not found.',
  })
  @ApiBearerAuth('jwt')
  async remove(
    @Req() req: Request & { user: { id: number } },
    @Param('id', ParseIntPipe) id: string
  ) {
    await this.subscriptionsService.checkSubscriptionCanBeRetrievedForUser(
      +id,
      req.user.id
    );

    await this.subscriptionsService.remove(+id);

    return { message: 'Subscription successfully deleted' };
  }
}

import { EventBussiness } from "@business/events/events.business";
import { CreateEventDto } from "@dto/events.dto";
import { ResponseInterface } from "@interfaces";
import { CreateEventInterface, EventsListInterface } from "@interfaces/services/events.interface";
import { Body, Controller, Get, Post, Req, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('event')
export class EventController {
    constructor(private readonly eventService:EventBussiness){}

    @Get('list')
    @ApiOperation({ summary: 'Events list' })
    @ApiResponse({ status: 200, description: 'Events' })
    public async getEvents():Promise<ResponseInterface<EventsListInterface>>{
        return await this.eventService.getEvents() as Promise<ResponseInterface<EventsListInterface>>
    }

    @Post('create')
    @ApiOperation({ summary: 'Event create' })
    @ApiResponse({ status: 200, description: 'Event create' })
    public async createEvent(
        @Req() req,
        @Body(new ValidationPipe()) data:CreateEventDto
    ):Promise<ResponseInterface<CreateEventInterface>>{
        return await this.eventService.createEvent(data)
    }
}
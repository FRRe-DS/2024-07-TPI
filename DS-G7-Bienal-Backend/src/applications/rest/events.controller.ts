import { JwtRoleAdminGuard } from "@business/auth/jwt.guard";
import { EventBusiness } from "@business/events/events.business";
import { CreateEventDto, EditEventDto } from "@dto/events.dto";
import { ResponseInterface } from "@interfaces";
import { CreateEventInterface, EventInterface, EventsListInterface } from "@interfaces/services/events.interface";
import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('event')
export class EventController {
    constructor(private readonly eventService:EventBusiness){}

    @Get('list')
    @ApiOperation({ summary: 'Events list' })
    @ApiResponse({ status: 200, description: 'Events' })
    public async getEvents():Promise<ResponseInterface<EventsListInterface>>{
        return await this.eventService.getEvents() as Promise<ResponseInterface<EventsListInterface>>
    }

    @Get('detail-id/:id')
    @ApiOperation({ summary: 'Events detail' })
    @ApiResponse({ status: 200, description: 'Event detail' })
    public async getDetailEventById(@Param('id') id:number):Promise<ResponseInterface<EventsListInterface>>{
        return await this.eventService.getEventById(id) as Promise<ResponseInterface<EventsListInterface>>
    }

    @Get('detail/:uuid')
    @ApiOperation({ summary: 'Events detail' })
    @ApiResponse({ status: 200, description: 'Event detail' })
    public async getDetailEvent(@Param('uuid') uuid:string):Promise<ResponseInterface<EventsListInterface>>{
        return await this.eventService.getEventByUuid(uuid) as Promise<ResponseInterface<EventsListInterface>>
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

    @Patch('edit/:id_event')
    @UseGuards(JwtRoleAdminGuard)
    public async editEvent(
        @Req() req,
        @Param('id_event')id_event:number,
        @Body(new ValidationPipe())data:EditEventDto,
    ):Promise<ResponseInterface<EventInterface>>{
        console.log(id_event)
        return this.eventService.editEvent(data, id_event)
    }
}
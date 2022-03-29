export interface ApiBus {
	GroupOfLine: string;
	TransportMode: string;
	LineNumber: string;
	Destination: string;
	JourneyDirection: string;
	StopAreaName: string;
	StopAreaNumber: string;
	StopPointNumber: string;
	StopPointDesignation: string;
	TimeTabledDateTime: string;
	ExpectedDateTime: string;
	DisplayTime: string;
	JourneyNumber: string;
	Deviations: string;
}

export interface Bus {
	lineNumber: string;
	destination: string;
	departureTime: Date;
}

export interface Busstop {
	Name: string;
	SiteId: number;
	Type: string;
	X: string;
	Y: string;
}

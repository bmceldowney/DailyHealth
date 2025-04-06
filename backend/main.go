package main

import (
	"context"
	"log"
	"net"
	"os"

	pb "dailyhealth/backend/proto"
	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedHealthServiceServer
}

func (s *server) GetHealthStatus(ctx context.Context, req *pb.HealthRequest) (*pb.HealthResponse, error) {
	return &pb.HealthResponse{
		Status:  "OK",
		Message: "Hello " + req.GetName(),
	}, nil
}

func main() {
	port := os.Getenv("GRPC_PORT")
	if port == "" {
		port = "50051"
	}

	lis, err := net.Listen("tcp", ":"+port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterHealthServiceServer(s, &server{})

	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
} 
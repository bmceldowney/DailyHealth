package main

import (
	"context"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"

	pb "dailyhealth/backend/proto"

	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedHealthServiceServer
}

func (s *server) GetHealthStatus(ctx context.Context, req *pb.HealthRequest) (*pb.HealthResponse, error) {
	log.Printf("Received health check request for: %s", req.GetName())
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

	// Handle graceful shutdown
	go func() {
		sigChan := make(chan os.Signal, 1)
		signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
		<-sigChan
		log.Println("Shutting down server...")
		s.GracefulStop()
	}()

	log.Printf("Server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

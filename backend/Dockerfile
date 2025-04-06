FROM golang:1.21

WORKDIR /app

RUN apk add --no-cache git

COPY go.mod ./

RUN go mod download -x && \
    go mod tidy

COPY . .

RUN go build -o main .

EXPOSE 50051

CMD ["./main"] 
using AutoMapper;
using DiveBuddyFinder.Models;
using DiveBuddyFinder.Models.Dtos.DiverDto;
using DiveBuddyFinder.Models.Dtos.Views;

namespace DiveBuddyFinder {

    public class AutoMapperProfile : Profile {
        public AutoMapperProfile()
        {
            CreateMap<Diver, DiverDto>();
            CreateMap<Diver, DiverViewDto>();
            CreateMap<CertificateDetails, CertificateDto>();
            CreateMap<Location, LocationDto>();
            CreateMap<CreateDiverDto, Diver>();
        }
    }


}
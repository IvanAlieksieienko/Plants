using System;
namespace Plants.Core.Entities
{
	public class Order
	{
		private OrderStatus status;

		public Guid ID { get; set; }
		public DateTime DateCreated { get; set; }
		public string Status
		{
			get => this.status.ToString();
			set => this.SetStatus(value);
		}

		public string FirstName { get; set; }
		public string SecondName { get; set; }
		public string Patronymic { get; set; }

		public string Region { get; set; }
		public string City { get; set; }
		public string Street { get; set; }
		public string AppartmentAdress { get; set; }
		public string DeliveryType { get; set; }

		public Order(Guid id, UserInfo userInfo, DeliveryInfo deliveryInfo)
		{
			this.status = OrderStatus.InProcess;
			this.DateCreated = DateTime.Now;
			this.FirstName = userInfo.FirstName;
			this.SecondName = userInfo.SecondName;
			this.Patronymic = userInfo.Patronymic;
			this.Region = deliveryInfo.Region;
			this.City = deliveryInfo.Region;
			this.Street = deliveryInfo.Street;
			this.AppartmentAdress = deliveryInfo.AppartmentAdress;
			this.DeliveryType = deliveryInfo.DeliveryType;
		}

		private void SetStatus(string status)
		{
			if (Enum.TryParse<OrderStatus>(status, out OrderStatus order))
			{
				this.status = order;
				return;
			}
			this.status = OrderStatus.InProcess;
		}
	}

	public class UserInfo
	{
		public string FirstName { get; set; }
		public string SecondName { get; set; }
		public string Patronymic { get; set; }

		public UserInfo(string firstName = "", string secondName = "", string patronymic = "")
		{
			this.FirstName = firstName;
			this.SecondName = secondName;
			this.Patronymic = patronymic;
		}

		public override string ToString()
		{
			return this.FirstName + " " + this.SecondName + " " + this.Patronymic;
		}
	}

	public class DeliveryInfo
	{
		private DeliveryType deliveryType;

		public string Region { get; set; }
		public string City { get; set; }
		public string DeliveryType
		{
			get => this.deliveryType.ToString();
			set
			{
				this.SetDeliveryType(value);
			}
		}
		public string Street { get; set; }
		public string AppartmentAdress { get; set; }

		public DeliveryInfo(string region, string city, DeliveryType deliveryType)
		{
			this.Region = region;
			this.City = city;
			this.deliveryType = deliveryType;
		}

		private void SetDeliveryType(string deliveryType)
		{
			if (Enum.TryParse<DeliveryType>(deliveryType, out DeliveryType type))
			{
				this.deliveryType = type;
				return;
			}
			this.deliveryType = Entities.DeliveryType.Pickup;
		}


	}

	public enum OrderStatus : byte
	{
		InProcess = 0,
		Ready = 1,
		Canceled = 2,
	}

	public enum DeliveryType : byte
	{
		NovaPoshta = 0,
		Pickup = 1
	}
}
